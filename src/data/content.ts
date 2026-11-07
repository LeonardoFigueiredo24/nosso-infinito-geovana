import type { MediaItem } from '@/lib/types';

export const content = {
  title: 'Nosso Infinito',
  recipient: 'Geovana',
  author: 'Leonardo',
  subtitle: 'Um cantinho feito só para nós.',
  introduction: 'Esse presente é um pedacinho de tudo o que eu sinto por você. Aqui estão memórias, sentimentos e palavras que eu quero que você guarde no coração.',
  letter: [
    'Meu amor,',
    'se você está vendo isso, é porque chegou até um lugar que eu preparei pensando em você.',
    'Cada detalhe aqui carrega um pouco do que sinto, porque você é uma das maiores certezas e alegrias da minha vida.',
    'Quero que esse cantinho te lembre o quanto você é amada, especial e importante para mim.',
    'Obrigado por existir, por estar ao meu lado e por fazer minha vida mais bonita.',
  ],
  letterSignature: 'Com amor, Leonardo. ❤️',
  secret: ['Você encontrou meu coração escondido. ❤️', 'E, na verdade, ele sempre foi seu.'],
  final: 'Esse presente é só uma pequena forma de te lembrar o quanto eu te amo.',
};

// Os marcos não têm datas inventadas. Adicione datas reais quando desejar.
export const timeline = [
  { title: 'Infância', text: 'Antes de entender o amor, nossos caminhos já faziam parte da mesma história.' },
  { title: 'Reencontro', text: 'A vida encontrou um jeito bonito de nos aproximar outra vez.' },
  { title: 'Primeiro beijo', text: 'Um instante pequeno. Um sentimento que ficou.' },
  { title: 'Pedido de namoro', text: 'O começo de tantas escolhas feitas a dois.' },
  { title: 'Superações', text: 'Em cada desafio, um motivo a mais para cuidar do que somos.' },
  { title: 'Recomeço', text: 'Escolher você, de novo. Com ainda mais carinho.' },
  { title: 'Fase atual', text: 'Nós, aqui e agora. Construindo o amor nos detalhes de cada dia.' },
  { title: 'Futuro juntos', text: 'Tantas páginas em branco. E eu quero escrever todas com você.' },
];

// Para ativar, coloque os arquivos em public/media e preencha src.
// Use caption para a descrição acessível do vídeo.
export const music: MediaItem = { title: 'Nossa música', src: '' };
export const film: MediaItem = { title: 'Nosso filme', src: '', poster: '', caption: '' };
