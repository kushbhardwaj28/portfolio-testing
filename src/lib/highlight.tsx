import type { ReactNode } from 'react';

/** Renders `**bold**` runs in a data string as a themed <strong>, leaving the rest as plain text. */
export function renderHighlighted(text: string, highlightClassName: string): ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={highlightClassName}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
