interface SectionHeadingProps {
  number: string;
  title: string;
}

export function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-[34px]">
      <span className="pix text-[11px] text-white bg-p1 border-[3px] border-line px-2 py-1.5 rounded-[3px] shadow-[3px_3px_0_var(--line)]">
        {number}
      </span>
      <h2 className="pix text-ink" style={{ fontSize: 'clamp(16px, 4vw, 28px)' }}>
        {title}
      </h2>
      <div
        className="flex-1 h-1"
        style={{ background: 'repeating-linear-gradient(90deg, var(--line) 0 8px, transparent 8px 14px)' }}
      />
    </div>
  );
}
