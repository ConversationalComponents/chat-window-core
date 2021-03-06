import React, {useState, ReactNode, useEffect} from "react";
import {Header} from "./header/Header";
import {ChatBody} from "./containers/ChatBody";
import {ChatBubble} from "./bubble/ChatBubble";
import {ChatEntry, ChatBubbleParams} from "../types";
import ChatBotContainer from "./containers/ChatBotContainer";
import {FooterInput} from "./footer/FooterInput";

export const ChatWindow = (p: {
    onBlur?: (e: React.FormEvent) => void;

    headerHeight?: number;
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
    onFocus?: (e: any) => void;

    bubble?: (p: ChatBubbleParams) => JSX.Element;
    /** footer to replace default */
    footer?: JSX.Element;
    /** additional header content */
    headerAdditionalContent?: JSX.Element;
    /** additional params to pass to bubbles */
    bubbleExtraParams?: any;
    isRtl?: boolean;
    /** custom endElement to pass to chatBubble */
    endElement?: JSX.Element;
}) => {
    const CustomBubble = p.bubble;
    const {content, title, header, isRtl} = p;
    const [bubbles, setBubbles] = useState<ReactNode[]>([]);

    useEffect(() => {
        const newBubbles = [] as JSX.Element[];

        content.forEach((c, i) => {
            const bubbles = CustomBubble ? (
                <CustomBubble {...{entry: c, bubbleExtraParams: p.bubbleExtraParams, endElement: p.endElement, isRtl}} key={c.id} />
            ) : (
                <ChatBubble {...{entry: c, bubbleExtraParams: p.bubbleExtraParams, endElement: p.endElement, isRtl}} key={c.id} />
            );
            newBubbles.push(bubbles);
        });

        setBubbles(newBubbles);
    }, [content]);

    return (
        <ChatBotContainer>
            {header ? (
                header
            ) : (
                <Header title={title || ""} extraContent={p.headerAdditionalContent} height={p.headerHeight || 56} />
            )}
            <ChatBody>{bubbles}</ChatBody>
            {p.footer ? (
                p.footer
            ) : (
                <FooterInput
                    {...{
                        onChange: p.onChange ? p.onChange : (t: string) => {},
                        onSubmit: p.onSubmit ? p.onSubmit : (t: string) => {},
                        onFocus: p.onFocus ? p.onFocus : undefined,
                        onBlur: p.onBlur ? p.onBlur : undefined,
                        inputPlaceholder: "Type here ...",
                    }}
                />
            )}
        </ChatBotContainer>
    );
};
