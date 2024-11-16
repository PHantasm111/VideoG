import axios from "axios";
import Replicate from "replicate";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";
import { NextResponse } from "next/server";

export async function POST(req) {

    const { prompt } = await req.json();

    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        });

        const input = {
            width: 1024,
            height: 1280,
            prompt: prompt,
            num_outputs: 1,
        };

        const output = await replicate.run("bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", { input });

        console.log(output);

        // Save to Firebase
        const base64Image = "data:image/png;base64," + await CoverImage(output[0]);
        const fileName = 'ai-short-video-files/' + Date.now() + '.png';
        const storageRef = ref(storage, fileName);

        await uploadString(storageRef, base64Image, 'data_url');

        const downloadUrl = await getDownloadURL(storageRef);

        console.log(downloadUrl);

        return NextResponse.json({ 'result': downloadUrl })

    } catch (error) {
        return NextResponse.json({ 'error': "Generate Image Error:" + error }, { status: 500 })
    }
}


const CoverImage = async (imageUrl) => {
    try {
        const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        const base64Image = Buffer.from(resp.data, 'binary').toString('base64');
        return base64Image;

    } catch (error) {
        console.log(error);
    }
}