import React from 'react'
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'

/**
 * Renders a video composition using Remotion components.
 *
 * @param {object} props - The component props.
 * @param {Array} props.script - The script data for the video.
 * @param {Array} props.imageList - List of image URLs to be displayed in the video.
 * @param {string} props.audioFileUrl - The URL of the audio file to be used in the video.
 * @param {Array} props.captions - Array of caption objects containing start, end times, and text.
 * @param {Function} props.setDurationInFrame - Function to set the duration of the video in frames.
 *
 * @returns {JSX.Element} The rendered video composition.
 */
const RemotionVideo = ({ script, imageList, audioFileUrl, captions, setDurationInFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getDurationFrame = () => {
    setDurationInFrame(captions[captions?.length - 1]?.end / 1000 * fps)
    return captions[captions?.length - 1]?.end / 1000 * fps
  }

  const getCurrentCaptions = () => {
    const currentTime = frame / 30 * 1000;
    const currentCaptions = captions?.find((caption) => caption.start <= currentTime && caption.end >= currentTime);

    return currentCaptions ? currentCaptions?.text : "";
  }

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => {

        const startTime = (index * getDurationFrame()) / imageList?.length;
        const duration = getDurationFrame();

        const scale = (scale) => interpolate(frame,
          [startTime, startTime + duration / 2, startTime + duration],
          index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
          {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
          }
        );

        return (
          <Sequence key={index} from={startTime} durationInFrames={getDurationFrame()}>
            <Img
              src={item}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${scale(index)})`
              }}
            />
          </Sequence>
        )
      })}
      <div
        className='text-4xl font-bold'
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          width: '100%',
          textAlign: 'center',
          color: '#F0F8FF',
          textShadow: '2px 2px 4px #000000'
        }}
      >
        {getCurrentCaptions()}
      </div>
      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  )
}

export default RemotionVideo