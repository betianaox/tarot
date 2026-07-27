import type { Tema } from './types';
import type { IdiomaConcreto } from './paquete';

// Textos de interfaz (botones, títulos, placeholders) por idioma. Separados
// del contenido de las lecturas: esto es "chrome" de la app. Portugués e
// italiano se ajustan a medida que se traduce el contenido.
export interface Textos {
  home: {
    pregunta: string;
    wiki: string;
    consejoDelDia: string;
    bienvenidoTitulo: string;
    bienvenidoPregunta: string;
    nombrePlaceholder: string;
    continuar: string;
  };
  pregunta: {
    titulo: string;
    chips: Record<Tema, string>;
    placeholder: string;
    tirar: string;
    hacerOtra: string;
    verLectura: string;
    verTirada: string;
    hintCorta: string;
  };
  wiki: {
    titulo: string;
    volver: string;
    enConstruccion: string;
    arcanosMayores: string;
    palabrasClave: string;
    derecho: string;
    invertido: string;
    simbolismo: string;
    datos: string;
    numero: string;
    elemento: string;
    proximamente: string;
  };
  overlaySinGemas: {
    titulo: string;
    texto: string;
    verVideo: string;
    cargando: string;
    ahoraNo: string;
  };
  avisoCorta: {
    titulo: string;
    texto: string;
    escribirMas: string;
    tirarIgual: string;
  };
  consejoDelDia: {
    titulo: string;
    volver: string;
  };
  ajustes: {
    titulo: string;
    seccionIdioma: string;
    seccionSobre: string;
    idiomaAuto: string;
    disclaimer: string;
  };
}

const es: Textos = {
  home: {
    pregunta: 'Pregunta',
    wiki: 'Wiki',
    consejoDelDia: 'Consejo del día',
    bienvenidoTitulo: 'Bienvenido a Tarot',
    bienvenidoPregunta: '¿Cómo te llamas?',
    nombrePlaceholder: 'Tu nombre',
    continuar: 'Continuar',
  },
  pregunta: {
    titulo: '¿Sobre qué quieres preguntar?',
    chips: { amor: 'Amor', trabajo: 'Trabajo', dinero: 'Dinero', general: 'General' },
    placeholder: 'Escribe tu pregunta...',
    tirar: 'Tirar las cartas',
    hacerOtra: 'Hacer otra pregunta',
    verLectura: 'Ver lectura',
    verTirada: 'Volver a la tirada',
    hintCorta: 'Escribe una pregunta un poco más larga para poder leerla.',
  },
  wiki: {
    titulo: 'Wiki',
    volver: 'Volver',
    enConstruccion: 'Aquí vas a aprender cada carta y su significado. Muy pronto.',
    arcanosMayores: 'Arcanos Mayores',
    palabrasClave: 'Palabras clave',
    derecho: 'Derecho',
    invertido: 'Invertido',
    simbolismo: 'Cómo leerla',
    datos: 'Datos',
    numero: 'Número',
    elemento: 'Elemento',
    proximamente: 'Contenido próximamente',
  },
  overlaySinGemas: {
    titulo: 'Te quedan 0 gemas',
    texto: 'Ver un video corto para ganar una gema',
    verVideo: '🎬 Ver video',
    cargando: 'Cargando video…',
    ahoraNo: 'Ahora no',
  },
  avisoCorta: {
    titulo: 'Tu pregunta es muy corta',
    texto:
      'Cuéntanos un poco más sobre lo que quieres saber y las cartas te responderán con más precisión.',
    escribirMas: 'Escribir más',
    tirarIgual: 'Tirar igual',
  },
  consejoDelDia: {
    titulo: 'Consejo del día',
    volver: 'Volver',
  },
  ajustes: {
    titulo: 'Ajustes',
    seccionIdioma: 'Idioma',
    seccionSobre: 'Sobre la app',
    idiomaAuto: 'Automático (idioma del sistema)',
    disclaimer:
      'Tarot es una aplicación de entretenimiento. No es adivinación ni predicción del futuro, ' +
      'y las interpretaciones que ofrece no constituyen asesoramiento profesional (médico, legal, ' +
      'financiero ni psicológico) ni reemplazan el criterio de cada persona. Es un espacio para la ' +
      'reflexión, no una fuente de certezas.',
  },
};

const en: Textos = {
  home: {
    pregunta: 'Ask a question',
    wiki: 'Wiki',
    consejoDelDia: 'Daily advice',
    bienvenidoTitulo: 'Welcome to Tarot',
    bienvenidoPregunta: "What's your name?",
    nombrePlaceholder: 'Your name',
    continuar: 'Continue',
  },
  pregunta: {
    titulo: 'What would you like to ask about?',
    chips: { amor: 'Love', trabajo: 'Work', dinero: 'Money', general: 'General' },
    placeholder: 'Type your question...',
    tirar: 'Draw the cards',
    hacerOtra: 'Ask another question',
    verLectura: 'View reading',
    verTirada: 'Back to the spread',
    hintCorta: 'Write a slightly longer question so we can read it.',
  },
  wiki: {
    titulo: 'Wiki',
    volver: 'Back',
    enConstruccion: "Here you'll learn every card and its meaning. Coming soon.",
    arcanosMayores: 'Major Arcana',
    palabrasClave: 'Keywords',
    derecho: 'Upright',
    invertido: 'Reversed',
    simbolismo: 'How to read it',
    datos: 'Details',
    numero: 'Number',
    elemento: 'Element',
    proximamente: 'Content coming soon',
  },
  overlaySinGemas: {
    titulo: 'You have 0 gems left',
    texto: 'Watch a short video to earn a gem',
    verVideo: '🎬 Watch video',
    cargando: 'Loading video…',
    ahoraNo: 'Not now',
  },
  avisoCorta: {
    titulo: 'Your question is very short',
    texto:
      'Tell us a little more about what you want to know and the cards will answer more precisely.',
    escribirMas: 'Write more',
    tirarIgual: 'Draw anyway',
  },
  consejoDelDia: {
    titulo: 'Daily advice',
    volver: 'Back',
  },
  ajustes: {
    titulo: 'Settings',
    seccionIdioma: 'Language',
    seccionSobre: 'About',
    idiomaAuto: 'Automatic (system language)',
    disclaimer:
      'Tarot is an entertainment app. It is not fortune-telling or prediction of the future, ' +
      'and the interpretations it offers do not constitute professional advice (medical, legal, ' +
      'financial, or psychological), nor do they replace your own judgment. It is a space for ' +
      'reflection, not a source of certainties.',
  },
};

const pt: Textos = {
  home: {
    pregunta: 'Fazer uma pergunta',
    wiki: 'Wiki',
    consejoDelDia: 'Conselho do dia',
    bienvenidoTitulo: 'Bem-vindo ao Tarot',
    bienvenidoPregunta: 'Como você se chama?',
    nombrePlaceholder: 'Seu nome',
    continuar: 'Continuar',
  },
  pregunta: {
    titulo: 'Sobre o que você quer perguntar?',
    chips: { amor: 'Amor', trabajo: 'Trabalho', dinero: 'Dinheiro', general: 'Geral' },
    placeholder: 'Escreva sua pergunta...',
    tirar: 'Tirar as cartas',
    hacerOtra: 'Fazer outra pergunta',
    verLectura: 'Ver leitura',
    verTirada: 'Voltar à tiragem',
    hintCorta: 'Escreva uma pergunta um pouco mais longa para podermos lê-la.',
  },
  wiki: {
    titulo: 'Wiki',
    volver: 'Voltar',
    enConstruccion: 'Aqui você vai aprender cada carta e seu significado. Em breve.',
    arcanosMayores: 'Arcanos Maiores',
    palabrasClave: 'Palavras-chave',
    derecho: 'Direita',
    invertido: 'Invertida',
    simbolismo: 'Como ler',
    datos: 'Dados',
    numero: 'Número',
    elemento: 'Elemento',
    proximamente: 'Conteúdo em breve',
  },
  overlaySinGemas: {
    titulo: 'Você tem 0 gemas',
    texto: 'Assista a um vídeo curto para ganhar uma gema',
    verVideo: '🎬 Assistir vídeo',
    cargando: 'Carregando vídeo…',
    ahoraNo: 'Agora não',
  },
  avisoCorta: {
    titulo: 'Sua pergunta é muito curta',
    texto:
      'Conte um pouco mais sobre o que você quer saber e as cartas vão responder com mais precisão.',
    escribirMas: 'Escrever mais',
    tirarIgual: 'Tirar mesmo assim',
  },
  consejoDelDia: {
    titulo: 'Conselho do dia',
    volver: 'Voltar',
  },
  ajustes: {
    titulo: 'Configurações',
    seccionIdioma: 'Idioma',
    seccionSobre: 'Sobre',
    idiomaAuto: 'Automático (idioma do sistema)',
    disclaimer:
      'Tarot é um aplicativo de entretenimento. Não é adivinhação nem previsão do futuro, ' +
      'e as interpretações que oferece não constituem aconselhamento profissional (médico, ' +
      'jurídico, financeiro ou psicológico), nem substituem o seu próprio julgamento. É um ' +
      'espaço para reflexão, não uma fonte de certezas.',
  },
};

const it: Textos = {
  home: {
    pregunta: 'Fai una domanda',
    wiki: 'Wiki',
    consejoDelDia: 'Consiglio del giorno',
    bienvenidoTitulo: 'Benvenuto in Tarot',
    bienvenidoPregunta: 'Come ti chiami?',
    nombrePlaceholder: 'Il tuo nome',
    continuar: 'Continua',
  },
  pregunta: {
    titulo: 'Su cosa vuoi fare la domanda?',
    chips: { amor: 'Amore', trabajo: 'Lavoro', dinero: 'Denaro', general: 'Generale' },
    placeholder: 'Scrivi la tua domanda...',
    tirar: 'Estrai le carte',
    hacerOtra: "Fai un'altra domanda",
    verLectura: 'Vedi lettura',
    verTirada: 'Torna alla stesa',
    hintCorta: "Scrivi una domanda un po' più lunga per poterla leggere.",
  },
  wiki: {
    titulo: 'Wiki',
    volver: 'Indietro',
    enConstruccion: 'Qui imparerai ogni carta e il suo significato. Presto disponibile.',
    arcanosMayores: 'Arcani Maggiori',
    palabrasClave: 'Parole chiave',
    derecho: 'Dritto',
    invertido: 'Rovesciata',
    simbolismo: 'Come leggerla',
    datos: 'Dati',
    numero: 'Numero',
    elemento: 'Elemento',
    proximamente: 'Contenuto in arrivo',
  },
  overlaySinGemas: {
    titulo: 'Ti restano 0 gemme',
    texto: 'Guarda un breve video per ottenere una gemma',
    verVideo: '🎬 Guarda il video',
    cargando: 'Caricamento video…',
    ahoraNo: 'Non ora',
  },
  avisoCorta: {
    titulo: 'La tua domanda è troppo breve',
    texto:
      "Raccontaci un po' di più su ciò che vuoi sapere e le carte risponderanno con più precisione.",
    escribirMas: 'Scrivi di più',
    tirarIgual: 'Estrai comunque',
  },
  consejoDelDia: {
    titulo: 'Consiglio del giorno',
    volver: 'Indietro',
  },
  ajustes: {
    titulo: 'Impostazioni',
    seccionIdioma: 'Lingua',
    seccionSobre: 'Informazioni',
    idiomaAuto: 'Automatico (lingua del sistema)',
    disclaimer:
      "Tarot è un'applicazione di intrattenimento. Non è divinazione né previsione del futuro, " +
      'e le interpretazioni che offre non costituiscono consulenza professionale (medica, legale, ' +
      'finanziaria o psicologica), né sostituiscono il giudizio di ciascuno. È uno spazio per la ' +
      'riflessione, non una fonte di certezze.',
  },
};

const textos: Record<IdiomaConcreto, Textos> = { es, en, pt, it };

export function obtenerTextos(idioma: IdiomaConcreto): Textos {
  return textos[idioma] ?? es;
}
