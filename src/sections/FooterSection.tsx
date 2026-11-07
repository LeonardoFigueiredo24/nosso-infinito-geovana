import { RotateCcw } from 'lucide-react';
import { Ornament } from '@/components/Ornament';
import { SecretHeart } from '@/components/SecretHeart';
import { content } from '@/data/content';
export function FooterSection({ onReplay }: { onReplay: () => void }) {
  return <footer className="footer-section"><div className="footer-inner"><Ornament /><span className="footer-name">Geovana,</span><h2>você é a melhor parte<br /><em>da minha vida.</em></h2><p>{content.final}</p><span className="footer-signature">Com amor, Leonardo. <SecretHeart /></span><button className="button secondary" onClick={onReplay}><RotateCcw size={16} />Ver tudo de novo</button><div className="footer-bottom"><span>Feito de nós. Feito para você.</span><span>Leonardo & Geovana</span></div></div></footer>;
}
