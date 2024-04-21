import React, { memo } from "react";
import { Chat } from "./";

const ChatsContainer = ({ history, isLoading }) => {
    const textFormatter = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    };
    return (
        <div className="col-[2/-2] flex flex-col gap-8 rounded px-8 py-4">
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
            {isLoading && <div className="loading-div " />}
        </div>
    );
};

export default memo(ChatsContainer);
