import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";
import db from "@/configs/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

const PlayerDialog = ({ playVideo, videoId }) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState();
    const [durationInFrame, setDurationInFrame] = useState(100);
    const router = useRouter();

    useEffect(() => {
        if (playVideo) {
            setOpenDialog(!openDialog);
            videoId && getVideoData();
        }
    }, [playVideo])

    const getVideoData = async () => {
        const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));

        console.log(result);
        setVideoData(result[0]);
    }

    return (
        <Dialog open={openDialog}>
            <DialogContent className="flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold my-5">Your video is ready !</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo}
                            durationInFrames={Number(durationInFrame.toFixed(0))}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={30}
                            inputProps={{
                                ...videoData,
                                setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
                            }}
                            controls={true}

                        />
                        <div className="flex gap-10 mt-10">
                            <Button variant="ghost" onClick={() => { router.replace("/dashboard"); setOpenDialog(false) }}>Cancel</Button>
                            <Button>Export</Button>
                        </div>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default PlayerDialog