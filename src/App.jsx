import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
    const API_KEY = "AIzaSyAeSRChCXp6BUz8b79p4X34IX9uUzue_xg";
    const genAI = new GoogleGenerativeAI(API_KEY);

    const [prompt, setPrompt] = useState("");
    const [text, setText] = useState("");

    const delayText = (text) => {
        const textArray = text.split(" ");
        textArray.forEach((word, _index) => {
            const timeout = setTimeout(() => {
                setText((prevText) => prevText + word + " ");
                clearTimeout(timeout);
            }, _index * 50);
        });
    };

    const boldTextFormatter = (text) => {
        const textArray = text.split("**");
        console.log(textArray);
        return (newTextArray = textArray.replace(
            /\*\*(.*?)\*\*/g,
            "<b>$1</b>",
        ));
        // textArray.map((word, _index) => {
        //     if (_index % 2 === 0) {
        //         return `<b>${word}</b>`;
        //     }
        //     console.log(word);
        // });
        // const newTextArray = textArray.map((word, _index) =>
        //     _index % 2 !== 0 ? `<b>${word}</b>` : word,
        // );
        // return newTextArray.join(" ");
    };

    // useEffect(() => {
    //     getResponse();
    // }, []);

    async function getResponse() {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log(response.text());
        const boldText = boldTextFormatter(response.text());
        delayText(boldText);
        setPrompt("");
        // console.log(boldText);
    }
    return (
        <div className="grid grid-cols-6 gap-4 py-8">
            <div className="col-[2/-2] rounded bg-slate-200">
                <pre
                    className="text-wrap p-8"
                    dangerouslySetInnerHTML={{ __html: text }}
                ></pre>
            </div>
            <div className="col-[2/-2] flex gap-4">
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
                    onClick={() => getResponse()}
                >
                    Generate
                </button>
            </div>
        </div>
    );
};

export default App;
