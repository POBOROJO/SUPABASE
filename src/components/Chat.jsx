import React, { memo } from "react";

const Chat = ({ children, role }) => {
    // const htmlParser = (text) => {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(text, "text/html");
    //     return doc.body.innerHTML;
    // };
    return (
        <div className="">
            <div className="px-8 font-bold ">
                {role === "user" ? "You" : "Response"}
            </div>
            <pre
                className={`text-wrap rounded-2xl ${role === "user" ? "bg-white py-4" : "bg-[#d8ede9] py-8"} w-fit px-8 `}
                // dangerouslySetInnerHTML={{__html: prevHistoryText,}}
                dangerouslySetInnerHTML={{ __html: children }}
            >
                {/* {htmlParser(children)} */}
            </pre>
        </div>
    );
};

export default memo(Chat);
