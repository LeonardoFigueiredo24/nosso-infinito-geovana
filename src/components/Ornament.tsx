import { Heart } from 'lucide-react';
export function Ornament({ className = '' }: { className?: string }) {
  return <div className={`ornament ${className}`} aria-hidden="true"><span /><Heart size={16} strokeWidth={1.3} /><span /></div>;
}
export function Monogram() {
  return <span className="monogram" aria-label="Leonardo e Geovana">L<Heart aria-hidden="true" size={23} strokeWidth={1.2} />G</span>;
}
