import React, { memo } from "react";
import { Chat } from "./";

const ChatsContainer = ({ history }) => {
    const textFormatter = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    };
    return (
        <div className="col-[3/-1] flex flex-col gap-8 rounded bg-gray-100 px-8 py-4">
            {history.map((item, index) => {
                const formattedText = textFormatter(
                    item.parts.map((part) => part.text).join("\n"),
                );
                return (
                    <Chat key={index} role={item.role}>
                        {formattedText}
                    </Chat>
                );
            })}
        </div>
    );
};

export default memo(ChatsContainer);
