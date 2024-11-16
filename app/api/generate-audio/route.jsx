import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextResponse } from "next/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";

const client = new TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});


export async function POST(req) {
    const { text, id } = await req.json();

    // Config to firebase storage
    // ref(storage, location)  Returns a Reference for the given location.
    const storageRef = ref(storage, 'ai-short-video-files/' + id + '.mp3');

    // Construct the request
    const request = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    // Write audio to firebase storage
    const audioBuffer = Buffer.from(response.audioContent, 'binary');

    // Upload the audio buffer to Firebase Storage with the specified content type
    await uploadBytes(storageRef, audioBuffer, {contentType: 'audio/mp3'});

    // Get the download URL of the uploaded audio file
    const downloadUrl = await getDownloadURL(storageRef);

    console.log(downloadUrl);
    
    return NextResponse.json({ result: downloadUrl });
}