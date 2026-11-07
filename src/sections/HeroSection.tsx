import { ArrowDown, Heart } from 'lucide-react';
import { content } from '@/data/content';
import { memories } from '@/data/memories';
import { Photo } from '@/components/Photo';
import { Ornament } from '@/components/Ornament';

export function HeroSection() {
  return <section id="inicio" className="hero section-shell" aria-labelledby="hero-title">
    <div className="hero-copy"><h1 id="hero-title" tabIndex={-1}>Nosso<br /><em>Infinito</em><Heart aria-label="amor" size={30} strokeWidth={1} /></h1>
      <Ornament /><p className="hero-subtitle">{content.subtitle}</p><p className="hero-intro">{content.introduction}</p>
      <a className="button primary" href="#memorias">Passear pelas nossas memórias <ArrowDown size={17} /></a>
      <span className="hero-dedication">De Leonardo, para o amor da minha vida.</span>
    </div>
    <div className="hero-album" aria-label="Retratos do nosso amor">
      <div className="album-orbit" aria-hidden="true" />
      <figure className="polaroid polaroid-back"><Photo memory={memories[18]} priority /><figcaption>nós, pelo mundo</figcaption></figure>
      <figure className="polaroid polaroid-front"><span className="photo-tape" aria-hidden="true" /><Photo memory={memories[23]} priority /><figcaption>meu lugar é com você <Heart size={19} strokeWidth={1.2} /></figcaption></figure>
      <span className="album-star" aria-hidden="true">✧</span>
    </div>
    <a href="#memorias" className="hero-scroll" aria-label="Ir para nossas memórias"><span>Tem tanto de nós aqui</span><ArrowDown size={15} /></a>
  </section>;
}
