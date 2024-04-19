import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { prevHistory } from "./prevHistory";

const App = () => {
    const API_KEY = "AIzaSyAeSRChCXp6BUz8b79p4X34IX9uUzue_xg";
    const genAI = new GoogleGenerativeAI(API_KEY);

    const [prevHistoryText, setPrevHistoryText] = useState("");

    const [prompt, setPrompt] = useState("");
    const [text, setText] = useState("");
    const [history, setHistory] = useState(prevHistory);

    useEffect(() => {
        setPrevHistoryText(
            textFormatter(
                history
                    .map((message) =>
                        message.parts.map((part) => part.text).join(" "),
                    )
                    .join("\n\n"),
            ),
        );
    }, []);

    const delayText = (text) => {
        const textArray = text.split(" ");
        textArray.forEach((word, _index) => {
            const timeout = setTimeout(() => {
                setText((prevText) => prevText + word + " ");
                clearTimeout(timeout);
            }, _index * 50);
        });
    };

    const textFormatter = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    };

    // not working as expected
    const convertToListItems = (str) => {
        const listItemRegex = /^\* (.+)$/gm;

        const listItems = str.replace(listItemRegex, "<li>$1</li>");
        console.log(`<ul>${listItems}</ul>`);
        return `<ul>${listItems}</ul>`;
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
            { role: "model", parts: [{ text: response.text() }] },
        ]);

        const formatedText = textFormatter(response.text());

        delayText("\n" + formatedText + "\n");
    }

    const handleInput = () => {
        setHistory((prevHistory) => [
            ...prevHistory,
            { role: "user", parts: [{ text: prompt }] },
        ]);
        setText((prevText) => prevText + prompt + "\n");
        getResponse();
        setPrompt("");
    };

    return (
        <div className="grid grid-cols-6 gap-4 py-8">
            <div className="col-[2/-2] rounded bg-slate-200">
                <pre
                    className="list-disc text-wrap p-8 pb-0"
                    dangerouslySetInnerHTML={{
                        __html: prevHistoryText,
                    }}
                ></pre>
                <pre
                    className="list-disc text-wrap p-8"
                    dangerouslySetInnerHTML={{ __html: text }}
                ></pre>
            </div>
            <div className="sticky bottom-4 col-[2/-2] flex gap-4">
                <input
                    className="flex-grow rounded border-2 border-purple-500 bg-slate-300 px-4 py-2 font-semibold text-purple-600"
                    type="text"
                    name="input"
                    id="input"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    type="button"
                    className="rounded bg-purple-500 px-4 py-2 hover:bg-purple-600 active:bg-purple-300 "
                    onClick={() => handleInput()}
                >
                    Generate
                </button>
            </div>
        </div>
    );
};

export default App;
