import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prevHistory } from "./prevHistory";

import { ChatsContainer } from "./components";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [inlineImageData, setInlineImageData] = useState({});
    const [history, setHistory] = useState(prevHistory);

    const printResponseText = (text) => {
        const textArray = text.split(" ");
        let emptyTextArray = [];

        textArray.forEach((word, _index) => {
            emptyTextArray.push(word);
            const text = emptyTextArray.join(" ");
            const timeout = setTimeout(() => {
                setHistory((history) => {
                    let updatedHistory = [...history];
                    updatedHistory[updatedHistory.length - 1].parts[0].text =
                        text;
                    return updatedHistory;
                });
                clearTimeout(timeout);
            }, _index * 50);
        });
    };

    const generateImageParts = (image) => {
        return {
            inlineData: {
                data: Buffer.from(fs.readFileSync(image)).toString("base64"),
                mimeType: `image/${image.split(".")[2]}`,
            },
        };
    };

    const textAndImagePromptRun = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        // const prompt = "What is the difference between the two images?";
        const images = [inlineImageData];
        console.log(prompt);
        console.log(images);

        const result = await model.generateContent([prompt, ...images]);
        const response = await result.response;
        console.log(history);

        setHistory((prevHistory) => [
            ...prevHistory,
            { role: "model", parts: [{ text: "" }] },
        ]);
        printResponseText(response.text());
    };

    async function getResponse() {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        console.log(history);

        setHistory((prevHistory) => [
            ...prevHistory,
            { role: "model", parts: [{ text: "" }] },
        ]);

        printResponseText(response.text());
    }

    const handleInput = () => {
        setHistory((prevHistory) => [
            ...prevHistory,
            { role: "user", parts: [{ text: prompt }] },
        ]);
        // setText((prevText) => prevText + prompt + "\n");

        if (image) console.log("image is set");
        image ? textAndImagePromptRun() : getResponse();

        // getResponse();
        console.log(image);
        console.log(inlineImageData);
        setPrompt("");
        setImage("");
        setInlineImageData({});
    };

    const handleFileInput = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
            setInlineImageData({
                inlineData: {
                    data: reader.result.split(",")[1],
                    mimeType: file.type,
                },
            });
            // console.log(reader.result);
        };
    };

    return (
        // <BrowserRouter>
        // <Routes>
        //     <Route path="/" element={<SignIn/>}/>
        //     <Route path="/signup" element={<SignUp/>}/>
        // </Routes>
        // </BrowserRouter>
        
        <div className="grid grid-cols-7 gap-3 bg-customNeutral  py-8">
            <ChatsContainer history={history} />
            <div className="sticky bottom-4 col-[3/-1] flex gap-4 px-8">
                <input
                    className="flex-grow rounded-2xl border-2 border-customLightGreen bg-white px-4 py-2 text-base font-semibold shadow-xl"
                    type="text"
                    name="input"
                    id="input"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (!prompt) return;
                        e.key === "Enter" && handleInput();
                    }}
                />
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) => {
                        console.log(e.target.files[0]);
                        handleFileInput(e.target.files[0]);
                    }}
                />
                <img
                    src={image}
                    alt="image"
                    className="aspect-square h-8 object-cover"
                />
                <button
                    type="button"
                    className="rounded-2xl bg-white px-4 py-2 shadow-xl hover:bg-customLightGreen active:bg-customGreen "
                    onClick={() => {
                        if (!prompt) return;
                        handleInput();
                    }}
                >
                    Generate
                </button>
            </div>
        </div>
    );
};

export default App;
