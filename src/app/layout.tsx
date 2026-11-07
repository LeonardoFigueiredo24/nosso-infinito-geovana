import type { Metadata, Viewport } from 'next';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/caveat/400.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nosso Infinito | Para Geovana, com amor',
  description: 'Um cantinho feito só para nós. De Leonardo, para Geovana.',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
  icons: { icon: '/icon.svg' },
  openGraph: { title: 'Uma surpresa para você ❤️', description: 'Um presente para abrir com o coração.', locale: 'pt_BR', type: 'website' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#fff9f5', colorScheme: 'light' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}<noscript><div className="noscript-message">Esse presente tem um coração interativo. Ative o JavaScript no navegador para abrir a surpresa. Com amor, Leonardo. ❤️</div></noscript></body></html>;
}
