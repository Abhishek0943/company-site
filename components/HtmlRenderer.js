'use client';
import parse, { domToReact } from 'html-react-parser';
import CopyCodeButton from './CopyCodeButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function HtmlRenderer({ html }) {
    if (!html) return null;

    const options = {
        replace: (domNode) => {
            // Find <pre> blocks containing <code>
            if (domNode.name === 'pre' && domNode.children && domNode.children.length > 0) {
                const codeNode = domNode.children.find(child => child.name === 'code');
                if (codeNode) {
                    // Extract plain text string to pass to our Copy button
                    const getTextContent = (node) => {
                        let text = '';
                        if (node.type === 'text') {
                            text += node.data;
                        } else if (node.children) {
                            node.children.forEach(child => {
                                text += getTextContent(child);
                            });
                        }
                        return text;
                    };

                    const codeString = getTextContent(codeNode);

                    let language = 'javascript';
                    if (codeNode.attribs && codeNode.attribs.class) {
                        const match = /language-(\w+)/.exec(codeNode.attribs.class);
                        if (match) {
                            language = match[1];
                        }
                    }

                    return (
                        <div className="relative my-8 rounded-xl overflow-hidden shadow-xl border border-[#2b3040] group">
                            <div className="relative">
                                <div className="text-[14px] p-0 " style={{ marginBottom: "1rem", borderRadius: "16px", overflow: "hidden", }}>
                                    <div style={{ padding: "1rem", background: "#11151f", borderBottom: "1px solid #282b31ff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div className="text-gray-400 text-sm leading-relaxed max-w-md" style={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "8px", color: "#0ed3cf" }}>
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f57" }}></div>
                                                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></div>
                                                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f" }}></div>
                                            </div>
                                            {language}
                                        </div>
                                        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <CopyCodeButton text={codeString} />
                                        </div>
                                    </div>
                                    <SyntaxHighlighter
                                        language={language}
                                        style={vscDarkPlus}
                                        PreTag="div"
                                        customStyle={{
                                            margin: 0,
                                            padding: '1.5rem',
                                            background: '#11151f',
                                            fontSize: '14px',
                                            fontFamily: 'JetBrains Mono, monospace',
                                            lineHeight: '1.6'
                                        }}
                                    >
                                        {codeString}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        }
    };

    return (
        <div className="prose prose-invert prose-p:my-6 prose-p:leading-loose prose-p:text-[17px] prose-p:text-gray-300 prose-headings:mb-6 prose-headings:mt-12 prose-headings:font-bold prose-pre:m-0 max-w-none prose-a:text-[#0ed3cf] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-2xl prose-li:text-[17px] prose-li:text-gray-300 prose-li:my-2 prose-ul:my-6 prose-ol:my-6">
            {parse(html, options)}
        </div>
    );
}
