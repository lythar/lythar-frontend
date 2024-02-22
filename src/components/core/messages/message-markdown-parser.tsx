import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Twemoji from "react-twemoji";

interface MessageMarkdownParserProps {
  content: string;
}

const MessageMarkdownParser: React.FC<MessageMarkdownParserProps> = ({
  content,
}) => {
  return (
    <Twemoji>
      <Markdown
        className="[&_p]:flex [&_p]:gap-2 BREAK_WORDS"
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              // @ts-ignore
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={dracula}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </Twemoji>
  );
};

export default MessageMarkdownParser;
