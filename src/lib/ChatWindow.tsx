import React, {useState, ReactNode, useEffect} from "react";
import {Header} from "./header/Header";
import {ChatBody} from "./containers/ChatBody";
import {ChatBubble} from "./bubble/ChatBubble";
import {FooterInput} from "./footer/FooterInput";
import {ChatEntry, ChatBubbleParams} from "../types";
import ChatBotContainer from "./containers/ChatBotContainer";

export const ChatWindow = (p: {
    /** array of entries to build bubbles from */
    content: ChatEntry[];
    /** title for the header, if using default header */
    title?: string;
    /** to be called on input change if using default footer */
    onSubmit?: (text: string) => void;
    //** to be called on input submit if using default footer */
    onChange?: (text: string) => void;
    /** header to replace default */
    header?: JSX.Element;
    /** buble rendering function - for custom bubbles */
    bubble?: (p: ChatBubbleParams) => JSX.Element;
    /** footer to replace default */
    footer?: JSX.Element;
    /** additional header content */
    headerAdditionalContent?: JSX.Element;
    /** additional params to pass to bubbles */
    bubbleExtraParams?: any;
}) => {
    const CustomBubble = p.bubble;
    const [content, setContent] = useState(p.content);
    useEffect(() => setContent(p.content), [p.content]);
    const [title, setTitle] = useState(p.title);
    useEffect(() => setTitle(p.title), [p.title]);
    const [bubbles, setBubbles] = useState<ReactNode[]>([]);
    useEffect(() => {
        const newBubbles = [] as JSX.Element[];
        content.forEach((c, i) => {
            const bubble = CustomBubble ? (
                <CustomBubble {...{entry: c, bubbleExtraParams: p.bubbleExtraParams}} key={c.id} />
            ) : (
                <ChatBubble {...{entry: c, bubbleExtraParams: p.bubbleExtraParams}} key={c.id} />
            );
            newBubbles.push(bubble);
        });
        setBubbles(newBubbles);
    }, [content]);

    return (
        <ChatBotContainer>
            {p.header ? p.header : <Header title={title || ""} extraContent={p.headerAdditionalContent} />}
            <ChatBody>{bubbles}</ChatBody>
            {p.footer ? (
                p.footer
            ) : (
                <FooterInput
                    {...{
                        onChange: p.onChange ? p.onChange : (t: string) => {},
                        onSubmit: p.onSubmit ? p.onSubmit : (t: string) => {},
                        inputPlaceholder: "Type here"
                    }}
                />
            )}
        </ChatBotContainer>
    );
};