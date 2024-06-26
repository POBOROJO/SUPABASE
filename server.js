const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Act as a funny teacher and answer my questions based on my inputs, and also make sure to give me an explanation if needed and be a bit and be funny with your response.";

  const imageParts = [fileToGenerativePart("image.png", "image/png")];

  const result = await model.generateContentStream([prompt, ...imageParts]);

  let text = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
  const response = await result.response;
  const Text = response.text();

  console.log(Text);
}

run();
