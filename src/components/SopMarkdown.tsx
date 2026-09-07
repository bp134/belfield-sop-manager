import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { AlertTriangle } from 'lucide-react';

function isCautionText(children: React.ReactNode): boolean {
  const text = String(children);
  return /caution|warning|important|danger/i.test(text.slice(0, 40));
}

const components: Components = {
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ children }) => <h2>{children}</h2>,
  h3: ({ children }) => <h3>{children}</h3>,
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
  blockquote: ({ children }) => {
    const caution = isCautionText(children);
    return (
      <blockquote className={caution ? '!border-red-500 !bg-red-50' : undefined}>
        {caution && (
          <div className="mb-1 flex items-center gap-1.5 font-bold text-red-700">
            <AlertTriangle className="h-4 w-4" />
            CAUTION
          </div>
        )}
        {children}
      </blockquote>
    );
  },
};

export default function SopMarkdown({ content }: { content: string }) {
  return (
    <div className="sop-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}