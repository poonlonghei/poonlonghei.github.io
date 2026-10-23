import ReactMarkdown from "react-markdown";

export function MarkdownContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          a: ({ href, title, children }) => {
            const external =
              href?.startsWith("https://") || href?.startsWith("http://");

            return (
              <a
                href={href}
                title={title}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function MarkdownHeading({
  content,
  level = 1,
  className,
  id,
}: {
  content: string;
  level?: 1 | 2;
  className?: string;
  id?: string;
}) {
  const markdown = `${"#".repeat(level)} ${content}`;

  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1 id={id} className={className}>{children}</h1>,
        h2: ({ children }) => <h2 id={id} className={className}>{children}</h2>,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
