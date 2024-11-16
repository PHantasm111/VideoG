const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-002",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Write a script to generate 30 seconds video on topic: interesting  historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"timeStart\": 0,\n    \"timeEnd\": 5,\n    \"imagePrompt\": \"Realistic painting of Archimedes in his bathtub, realizing the principle of buoyancy, with water splashing, ancient Greek setting.\",\n    \"ContentText\": \"Around 250 BC, in ancient Syracuse, a brilliant mathematician named Archimedes was tasked by the king to determine if a crown was made of pure gold.\"\n  },\n  {\n    \"timeStart\": 5,\n    \"timeEnd\": 10,\n    \"imagePrompt\": \"Realistic painting of Archimedes stepping out of his bath, shouting 'Eureka!', running through the streets of ancient Syracuse draped in a towel.\",\n    \"ContentText\": \"Struggling with the problem, Archimedes took a bath. As he lowered himself into the water, he noticed the water level rising. This observation sparked a realization.\"\n  },\n  {\n    \"timeStart\": 10,\n    \"timeEnd\": 15,\n    \"imagePrompt\": \"Realistic painting of a gold crown being weighed against an equal mass of pure gold on a balance scale, with Archimedes observing intently.\",\n    \"ContentText\": \"He realized that an object submerged in water displaces a volume of water equal to its own volume. This principle, known as buoyancy, provided the solution.\"\n  },\n  {\n    \"timeStart\": 15,\n    \"timeEnd\": 20,\n    \"imagePrompt\": \"Realistic painting showing Archimedes explaining the principle of buoyancy to the King of Syracuse with the crown and different materials in bowls of water.\",\n    \"ContentText\": \"By comparing the water displaced by the crown with the water displaced by an equal mass of pure gold, Archimedes could determine the crown's density and therefore its purity.\"\n  },\n  {\n    \"timeStart\": 20,\n    \"timeEnd\": 25,\n    \"imagePrompt\": \"Realistic painting depicting the king's goldsmith being apprehended by guards, a look of guilt on his face, as Archimedes and the king watch.\",\n    \"ContentText\": \"The crown, it turned out, was not pure gold! Archimedes' discovery not only solved the king's problem but also established a fundamental principle of physics.\"\n  },\n  {\n    \"timeStart\": 25,\n    \"timeEnd\": 30,\n    \"imagePrompt\": \"Realistic painting of a modern-day ship floating on water, transitioning into a close-up of a formula illustrating Archimedes' principle of buoyancy.\",\n    \"ContentText\": \"Archimedes' principle of buoyancy continues to be relevant today, playing a crucial role in shipbuilding, submarine design, and many other fields.\"\n  }\n]\n```\n\n**Explanation of the JSON structure:**\n\n* **timeStart:** The start time of the scene in seconds.\n* **timeEnd:** The end time of the scene in seconds.\n* **imagePrompt:** A text prompt designed to be used with an AI image generator to create a realistic image corresponding to the scene.  It's important to be descriptive to get the best results.\n* **ContentText:** The narration or text that will accompany the image during the video.\n\n\n**How to use this JSON data to create a video:**\n\n1. **Generate Images:** Use an AI art generator (like Midjourney, Stable Diffusion, or DALL-E 2) with the `imagePrompt` text to generate realistic images for each scene. Save the generated images.\n\n2. **Video Editing Software:** Import the images into video editing software (like DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro, or even simpler online tools like Canva or Kapwing).\n\n3. **Timeline and Timing:** Arrange the images on the timeline according to the `timeStart` and `timeEnd` values.  Ensure each image is displayed for the correct duration.\n\n4. **Add Narration/Text:** Add the `ContentText` as narration (using a text-to-speech tool or recording your own voice) or as text overlays on the video.\n\n5. **Music and Effects (Optional):**  Add background music and any other desired visual effects.\n\n6. **Export:** Export your video in the desired format (e.g., MP4).\n\n\nThis script provides a framework for creating an engaging 30-second video using AI-generated imagery.  You can customize the narration, music, and visual effects to create a unique and compelling historical story.  Remember that the quality of the final video will depend heavily on the quality of the AI-generated images, so craft your prompts carefully.\n" },
            ],
        },
    ],
});
