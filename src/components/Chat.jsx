import React, { memo } from "react";

const Chat = ({ children, role }) => {
    // const htmlParser = (text) => {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(text, "text/html");
    //     return doc.body.innerHTML;
    // };
    return (
        <div className="relative grid gap-1">
            <div className="bg-customGreen absolute left-0 top-0 grid aspect-square w-12 -translate-x-1/2 place-items-center rounded-2xl font-bold text-white">
                {role === "user" ? "Y" : "C"}
            </div>
            <div className="px-8 font-semibold ">
                {role === "user" ? "You" : "Response"}
            </div>
            <pre
                className={`text-wrap rounded-2xl ${role === "user" ? "bg-white py-4" : " bg-customLightGreen py-8"} w-fit px-10 `}
                // dangerouslySetInnerHTML={{__html: prevHistoryText,}}
                dangerouslySetInnerHTML={{ __html: children }}
            >
                {/* {htmlParser(children)} */}
            </pre>
        </div>
    );
};

export default memo(Chat);
