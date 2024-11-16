"use client"
import { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import CustomLoading from './_components/CustomLoading'
import { Button } from '@/components/ui/button'
import { v4 as uuid4 } from 'uuid';
import axios from 'axios'
import { VideoDataContext } from '@/app/_context/VideoDataContext'
import { Users, VideoData } from '@/configs/schema'
import db from '@/configs/db'
import { useUser } from '@clerk/nextjs'
import PlayerDialog from '../_components/PlayerDialog'
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { useToast } from '@/hooks/use-toast'
import { eq } from 'drizzle-orm'

const CreateNew = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const { user } = useUser();
  const [playerOpen, setPlayerOpen] = useState(false);
  const [videoId, setVideoId] = useState();
  const { videoData, setVideoData } = useContext(VideoDataContext);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { toast } = useToast();


  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  }

  // onclick create video function 
  const onCreateClickHandler = () => {
    if (userDetail.credits <= 10) {
      toast({
        title: "Lack of Credits",
        description: "You don't have enough credits to create a video. Please buy more credits to create a video."
      })
      return;
    } else {
      getVideoScript();
    }
  }

  // Get Video Script from AI
  const getVideoScript = async () => {
    setLoading(true);
    const prompt = 'Write a script to generate ' + formData.duration + ' video on topic ' + formData.topic + ' along with AI image prompt in ' + formData.imageStyle + ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text';

    const resp = await axios.post('/api/get-video-script', {
      prompt
    });
    console.log(resp.data.result);
    setVideoData(prev => ({
      ...prev,
      'videoScript': resp.data.result
    }));
    setVideoScript(resp.data.result);
    await generateAudioFile(resp.data.result);

  }

  const generateAudioFile = async (videoScriptData) => {
    const id = uuid4();

    // Generate video script
    let script = "";

    videoScriptData.forEach((item) => {
      script += item.ContentText + " ";
    });

    // Generate audio file using text-to-speech API
    const resp = await axios.post('/api/generate-audio', {
      text: script,
      id
    });

    setVideoData(prev => ({
      ...prev,
      'audioFileUrl': resp.data.result
    }));

    console.log(resp.data);
    setAudioFileUrl(resp.data.result);
    resp.data.result && await generateAudioCaption(resp.data.result, videoScriptData);

  }

  const generateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);

    const resp = await axios.post('/api/generate-caption', {
      audioFileUrl: fileUrl
    })

    setVideoData(prev => ({
      ...prev,
      'captions': resp.data.result
    }));

    console.log(resp.data.result);
    setCaptions(resp?.data?.result);
    resp.data.result && await generateImage(videoScriptData);

  }

  const generateImage = async (videoScriptData) => {
    let images = [];

    console.log("videoScript in generateImage", videoScriptData);
    for (const element of videoScriptData) {
      try {
        const resp = await axios.post('/api/generate-image', {
          prompt: element.imagePrompt
        });

        console.log(resp.data.result);
        images.push(resp.data.result);
      } catch (error) {
        console.log("Error", error);
      }
    }
    setVideoData(prev => ({
      ...prev,
      'imageList': images
    }));
    console.log(images);
    setImageList(images);
    setLoading(false);
  }

  useEffect(() => {
    console.log(videoData);

    if (Object.keys(videoData).length === 4) {
      SaveVideoData(videoData);
    }
  }, [videoData])

  const SaveVideoData = async (videoData) => {
    setLoading(true);

    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.captions,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({ id: VideoData.id });

    await updateUserCredits();
    setVideoId(result[0].id);
    setPlayerOpen(true);
    console.log(result);
    setLoading(false);
  }

  /**
   * Updates the user's credits by deducting 10 credits.
   * 
   * This function updates the user's credits in the database by subtracting 10 from the current credits.
   * It then logs the result of the database update and updates the local user detail state.
   * 
   * @return {Promise<void>}
   */
  const updateUserCredits = async () => {
    const result = await db.update(Users).set({
      credits: userDetail?.credits - 10
    }).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    console.log(result);
    setUserDetail((prev) => ({ ...prev, "credits": userDetail?.credits - 10 }));

    setVideoData(null);
  }

  return (
    <div className='md:px-20'>
      <h2 className='text-4xl font-bold text-primary text-center'>Create New</h2>

      <div className='mt2 shadow-md p-10'>
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button */}
        <Button className='mt-14 w-full h-20 md:h-16 md:w-96 text-xl' onClick={() => onCreateClickHandler()}>Create NOW</Button>
      </div>

      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playerOpen} videoId={videoId} />
    </div>
  )
}

export default CreateNew