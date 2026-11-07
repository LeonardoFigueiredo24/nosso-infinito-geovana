export type MemoryCategory = 'Nosso jeitinho' | 'Dias especiais' | 'Pelo mundo';
export interface Memory {
  id: number;
  image: string;
  title: string;
  message: string;
  category: MemoryCategory;
  alt: string;
  position?: string;
  date?: string;
}
export interface MediaItem {
  title: string;
  src: string;
  poster?: string;
  caption?: string;
}
