import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const url = process.argv[2];
if (!url || !/^https:\/\//.test(url)) {
  console.error('Use: npm run qr -- "https://endereco-final" "../qr-code"');
  process.exit(1);
}
new URL(url);
const output = path.resolve(process.argv[3] || '../qr-code');
await mkdir(output, { recursive: true });
const options = { errorCorrectionLevel: 'H', margin: 4, color: { dark: '#633644', light: '#FFFFFF' } };
await QRCode.toFile(path.join(output, 'qr-nosso-infinito.png'), url, { ...options, width: 1600 });
const svg = await QRCode.toString(url, { ...options, type: 'svg' });
await writeFile(path.join(output, 'qr-nosso-infinito.svg'), svg);
const safe = url.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
await writeFile(path.join(output, 'etiqueta.html'), `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Para Geovana — etiqueta do presente</title><style>*{box-sizing:border-box}body{margin:0;display:grid;place-content:center;min-height:100vh;background:#f7ede8;color:#633644;font-family:Georgia,serif}.tag{width:60mm;min-height:90mm;background:#fffaf6;border:1px solid #d5b5a4;border-radius:5mm;padding:7mm 5mm 5mm;text-align:center}.hole{margin:0 auto 6mm;width:4mm;height:4mm;border:1px solid #ba9c8b;border-radius:50%}h1{font-size:20pt;font-weight:normal;margin:2mm 0}p{font:9pt/1.5 Arial,sans-serif;margin:3mm 0}.qr{width:45mm;height:45mm;margin:auto;background:white}.qr svg{width:100%;height:100%}.signature{font-style:italic;font-size:13pt}.info{max-width:330px;font:12px/1.6 Arial,sans-serif;text-align:center;margin:20px auto}button{display:block;margin:15px auto;padding:10px 18px;background:#633644;color:white;border:0;border-radius:25px;cursor:pointer}@media print{@page{size:A4;margin:20mm}body{display:block;min-height:auto;background:white}.tag{break-inside:avoid}.info,button{display:none}}</style><article class="tag"><div class="hole"></div><h1>Geovana,</h1><p>tem um pedacinho do meu coração<br>esperando por você.</p><div class="qr">${svg}</div><p>Aponte a câmera e abra<br>o seu presente. ♡</p><div class="signature">Com amor, Leonardo.</div></article><button onclick="window.print()">Imprimir etiqueta</button><div class="info">Imprima em tamanho real (100%). Teste em outro celular antes de entregar.<br><a href="${safe}">Abrir o presente</a></div></html>`);
await writeFile(path.join(output, 'endereco.txt'), url + '\n');
console.log(`QR Code e etiqueta gerados em ${output}`);
