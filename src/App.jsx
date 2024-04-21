import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prevHistory } from "./prevHistory";

import { ChatsContainer, ChatBar } from "./components";

const App = () => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [inlineImageData, setInlineImageData] = useState({});
    const [history, setHistory] = useState(prevHistory);
    const [isLoading, setIsLoading] = useState(false);

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

    const textAndImagePromptRun = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const images = [inlineImageData];

        setIsLoading(true);
        const result = await model.generateContent([prompt, ...images]);
        const response = await result.response;
        setIsLoading(false);

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

        setIsLoading(true);
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        setIsLoading(false);

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

        if (image) console.log("image is set");
        image ? textAndImagePromptRun() : getResponse();

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
        <div className="grid grid-cols-7 gap-3 bg-customNeutral  py-8">
            <ChatsContainer history={history} isLoading={isLoading} />
            {/* <div className="sticky bottom-4 col-[3/-1] grid gap-4 px-8">
                {image && (
                    <img
                        src={image}
                        alt="image"
                        className="aspect-square h-20 rounded-2xl bg-white object-cover p-2"
                    />
                )}

                <div className="flex flex-grow items-center gap-4">
                    <div className=" relative flex flex-grow">
                        <input
                            className="flex-grow rounded-2xl  bg-white p-4 pr-16 text-base font-semibold shadow-xl focus:outline-0"
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
                        <label
                            htmlFor="image"
                            className=" as absolute right-0 grid h-full place-items-center rounded-2xl bg-white px-4  hover:bg-customNeutral active:bg-customGreen"
                        >
                            <FaImage />
                        </label>
                    </div>

                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            handleFileInput(e.target.files[0]);
                        }}
                        className=" hidden"
                    />

                    <button
                        type="button"
                        className="h-full rounded-2xl border-2 border-customLightGreen bg-white px-4 shadow-xl hover:bg-customLightGreen active:bg-customGreen "
                        onClick={() => {
                            if (!prompt) return;
                            handleInput();
                        }}
                    >
                        Generate
                    </button>
                </div>
            </div> */}
            <ChatBar
                prompt={prompt}
                setPrompt={setPrompt}
                handleInput={handleInput}
                handleFileInput={handleFileInput}
                image={image}
                setImage={setImage}
            />
        </div>
    );
};

export default App;
