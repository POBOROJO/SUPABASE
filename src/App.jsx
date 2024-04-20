import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prevHistory } from "./prevHistory";

import { ChatsContainer } from "./components";

const App = () => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const [prompt, setPrompt] = useState("");
    const [history, setHistory] = useState(prevHistory);

    // const delayText = (text) => {
    //     const textArray = text.split(" ");
    //     textArray.forEach((word, _index) => {
    //         const timeout = setTimeout(() => {
    //             setText((prevText) => prevText + word + " ");
    //             clearTimeout(timeout);
    //         }, _index * 50);
    //     });
    // };

    // not working as expected
    const convertToListItems = (str) => {
        const listItemRegex = /^\* (.+)$/gm;

        const listItems = str.replace(listItemRegex, "<li>$1</li>");
        console.log(`<ul>${listItems}</ul>`);
        return `<ul>${listItems}</ul>`;
    };

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
        getResponse();
        setPrompt("");
    };

    return (
        <div className="bg-customNeutral grid grid-cols-7 gap-3  py-8">
            <ChatsContainer history={history} />
            <div className="sticky bottom-4 col-[3/-1] flex gap-4 px-8">
                <input
                    className="border-customLightGreen flex-grow rounded-2xl border-2 bg-white px-4 py-2 text-base font-semibold shadow-xl"
                    type="text"
                    name="input"
                    id="input"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    type="button"
                    className="hover:bg-customLightGreen active:bg-customGreen rounded-2xl bg-white px-4 py-2 shadow-xl "
                    onClick={() => handleInput()}
                >
                    Generate
                </button>
            </div>
        </div>
    );
};

export default App;
