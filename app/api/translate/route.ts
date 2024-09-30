import { NextResponse } from "next/server";
import translate from "google-translate-api-x"; // Import the translation package

export async function POST(req: Request) {
  try {
    const { message, targetLang } = await req.json();
    console.log("Received message:", message); // Log the received message
    console.log("Target language:", targetLang); // Log the target language

    // Call your translation service API
    const translatedText = await translateMessage(message, targetLang);
    console.log("Translated text:", translatedText); // Log the translated text

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function translateMessage(message: string, targetLang: string) {
  try {
    const res = await translate(message, { to: targetLang });
    return res.text; // Return the translated text
  } catch (error) {
    console.error("Error in translateMessage:", error);
    throw new Error("Translation failed");
  }
}


// import { NextResponse } from "next/server";

// // This function is called to handle the POST request
// export async function POST(req: Request) {
//   try {
//     const { messages, targetLang } = await req.json();

//     // Here you can call your translation service API
//     const translatedMessages = await translateMessages(messages, targetLang);

//     return NextResponse.json({ translatedMessages });
//   } catch (error) {
//     console.error("Translation error:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

// // This function translates an array of messages
// async function translateMessages(
//   messages: { content: string; id: string }[],
//   targetLang: string
// ) {
//   // Replace with your translation API logic
//   const translatedMessages = await Promise.all(
//     messages.map(async (msg) => {
//       const translatedText = await translateMessage(msg.content, targetLang);
//       return { ...msg, content: translatedText }; // Return the translated message
//     })
//   );

//   return translatedMessages;
// }

// // This function simulates a translation service (replace with actual API call)
// async function translateMessage(message: string, targetLang: string) {
//   // Simulated translation logic
//   return `Translated message to ${targetLang}: ${message}`; // Placeholder implementation
// }
