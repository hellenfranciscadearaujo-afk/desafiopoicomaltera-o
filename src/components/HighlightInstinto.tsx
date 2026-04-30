/**
 * HighlightInstinto — destaca a palavra "instinto" / "Instinto" em qualquer texto,
 * com cor primary e bold, mantendo a flexão (instintos, instinto, etc).
 */

interface Props {
  children: string;
  className?: string;
}

export const HighlightInstinto = ({ children, className }: Props) => {
  // Match: instinto, instintos, Instinto, Instintos
  const parts = children.split(/(\binstintos?\b)/gi);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        /^instintos?$/i.test(part) ? (
          <span key={i} className="font-bold text-highlight">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};
