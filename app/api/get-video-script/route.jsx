import { chatSession } from "@/configs/AI_models";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        console.log(prompt);

        const res = await chatSession.sendMessage(prompt);
        console.log(res.response.text());
        
        return NextResponse.json({'result':JSON.parse(res.response.text())})
        
    } catch (error) {
        return NextResponse.json({'error': error}, { status: 500 })
    }
}