const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefixa arquivos públicos quando o site é servido em um subdiretório, como no GitHub Pages. */
export function assetPath(path: string) {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
