import type { IdiomaConcreto } from '../content/paquete';
import type { Tema } from '../content/types';

// Bancos de palabras clave para la detección (tema, modo, tono, tiempo,
// tercero), por idioma. La persona escribe en su idioma, así que la detección
// tiene que estar localizada o el tono/eco/auto-tema se apagarían fuera del
// español. Portugués e italiano caen a español hasta que se traduzcan.
export interface BancoDeteccion {
  tema: Record<Exclude<Tema, 'general'>, string[]>;
  modoCerrada: string[];
  preocupacion: string[];
  impulso: string[];
  futuro: string[];
  pasado: string[];
  tercero: string[];
}

const es: BancoDeteccion = {
  tema: {
    amor: [
      'amor', 'pareja', 'relacion', 'mi ex', ' ex ', 'enamor', 'corazon',
      'siento por', 'sentimientos', 'casamiento', 'casarme', 'noviazgo',
      'novio', 'novia', 'me quiere', 'me ama', 'extraño', 'extrano', 'celos',
      'infiel', 'separacion', 'separarme', 'divorcio', 'volver con',
    ],
    trabajo: [
      'trabajo', 'laboral', 'jefe', 'jefa', 'empleo', 'renunciar', 'renuncia',
      'entrevista', 'puesto', 'oficina', 'compañero', 'compañera',
      'proyecto', 'emprendimiento', 'emprender', 'carrera', 'ascenso',
      'changa', 'curro',
    ],
    dinero: [
      'dinero', 'plata', 'deuda', 'deudas', 'ahorro', 'ahorrar', 'inversion',
      'invertir', 'prestamo', 'sueldo', 'gastar', 'gasto', 'compra',
      'economico', 'economica', 'finanzas', 'guita', 'negocio', 'ganancia',
    ],
  },
  modoCerrada: [
    'va a', 'voy a', 'vuelve', 'volvera', 'volveremos', 'regresa', 'regresara',
    'conviene', 'deberia', 'debo', 'tengo que', 'funciona', 'funcionara',
    'me quiere', 'me ama', 'es correcto', 'es buena idea', 'sirve',
    'lograre', 'conseguire', 'es el indicado', 'es la indicada', 'si o no',
  ],
  preocupacion: [
    'miedo', 'angustia', 'no se', 'no puedo', 'perdi', 'duda', 'dudas',
    'ansiedad', 'ansiosa', 'ansioso', 'triste', 'tristeza', 'sufro', 'sufrir',
    'preocupa', 'preocupada', 'preocupado', 'asusta', 'sola', 'solo', 'vacio',
    'vacia', 'llorar', 'desesper', 'no aguanto', 'cansada', 'cansado', 'agotada',
    'agotado', 'harta', 'harto', 'confundida', 'confundido', 'perdida', 'perdido',
  ],
  impulso: [
    'quiero', 'ilusion', 'ganas', 'empezar', 'arrancar', 'oportunidad', 'deseo',
    'sueño', 'suenio', 'ilusionada', 'ilusionado', 'entusiasmo', 'entusiasmada',
    'entusiasmado', 'feliz', 'contenta', 'contento', 'esperanza', 'animo',
    'animarme', 'decidida', 'decidido', 'nueva etapa', 'empiezo',
  ],
  futuro: [
    'va a', 'voy a', 'sera', 'seremos', 'vendra', 'conviene', 'deberia', 'debo',
    'tengo que', 'futuro', 'mañana', 'manana', 'proximo', 'proxima', 'adelante',
    'lograre', 'conseguire', 'algun dia', 'llegara', 'pasara', 'volvera',
  ],
  pasado: [
    'fue', 'era', 'paso', 'pasado', 'antes', 'mi ex', 'lo que hice', 'habia',
    'tuve', 'estuvo', 'termino', 'se fue', 'dejo', 'arrepiento', 'arrepentida',
    'arrepentido', 'ya no', 'solia', 'perdi', 'lo que paso',
  ],
  tercero: [
    'mi ex', 'mi pareja', 'mi novio', 'mi novia', 'mi jefe', 'mi jefa',
    'mi socio', 'mi socia', 'mi amigo', 'mi amiga', 'mi marido', 'mi esposa',
    'mi esposo', 'mi madre', 'mi padre', 'mi hermano', 'mi hermana',
    'mi companero', 'mi compañera', 'mi compañero', 'esa persona', 'esta persona',
    'esa chica', 'ese chico', 'alguien', 'con el', 'con ella',
  ],
};

const en: BancoDeteccion = {
  tema: {
    amor: [
      'love', 'partner', 'relationship', 'my ex', ' ex ', 'crush', 'heart',
      'feelings', 'marriage', 'marry', 'married', 'dating', 'boyfriend',
      'girlfriend', 'loves me', 'love me', 'miss him', 'miss her', 'jealous',
      'jealousy', 'cheating', 'cheated', 'break up', 'breakup', 'divorce',
      'get back together', 'romance', 'date',
    ],
    trabajo: [
      'work', 'job', 'boss', 'employment', 'quit', 'resign', 'interview',
      'position', 'office', 'coworker', 'colleague', 'project', 'business',
      'career', 'promotion', 'hired', 'fired', 'workplace', 'manager',
      'my company',
    ],
    dinero: [
      'money', 'cash', 'debt', 'debts', 'savings', 'save', 'investment',
      'invest', 'loan', 'salary', 'spend', 'expense', 'purchase', 'financial',
      'finances', 'budget', 'income', 'profit', 'afford', 'bills', 'wage',
    ],
  },
  modoCerrada: [
    'will i', 'will he', 'will she', 'will they', 'will it', 'am i going to',
    'is he going to', 'is she going to', 'should i', 'do i have to', 'does it work',
    'does he love', 'does she love', 'is it right', 'is it a good idea',
    'will it work', 'yes or no', 'is he the one', 'is she the one', 'will i get',
    'will i find', 'get back together', 'is it worth',
  ],
  preocupacion: [
    'fear', 'afraid', 'scared', 'anxiety', 'anxious', 'worried', 'worry',
    'sad', 'sadness', 'suffer', 'suffering', 'alone', 'lonely', 'empty',
    'cry', 'crying', 'desperate', 'exhausted', 'tired', 'fed up', 'confused',
    'lost', 'hurt', 'stuck', 'overwhelmed', 'stressed', 'ashamed',
  ],
  impulso: [
    'want', 'excited', 'excitement', 'eager', 'hope', 'hopeful', 'start',
    'begin', 'brand new', 'opportunity', 'wish', 'dream', 'enthusiasm',
    'happy', 'glad', 'motivated', 'ready to', 'looking forward', 'thrilled',
    'fresh start',
  ],
  futuro: [
    'will', 'going to', 'gonna', 'should i', 'tomorrow', 'future', 'next',
    'ahead', 'soon', 'someday', 'is it going to', 'am i going to', 'will i',
    'be able to',
  ],
  pasado: [
    'was', 'were', 'used to', 'before', 'my ex', 'what i did', 'had',
    'happened', 'ended', 'left me', 'back then', 'regret', 'the past',
    'no longer', 'we broke',
  ],
  tercero: [
    'my ex', 'my partner', 'my boyfriend', 'my girlfriend', 'my boss',
    'my husband', 'my wife', 'my mother', 'my father', 'my brother',
    'my sister', 'my friend', 'my coworker', 'my colleague', 'that person',
    'this person', 'that guy', 'that girl', 'someone', 'with him', 'with her',
    ' he ', ' she ', ' him ', ' her ',
  ],
};

const pt: BancoDeteccion = {
  tema: {
    amor: [
      'amor', 'parceiro', 'parceira', 'relacionamento', 'relação', 'meu ex',
      'minha ex', ' ex ', 'paixão', 'coração', 'sentimentos', 'casamento',
      'casar', 'namoro', 'namorado', 'namorada', 'me ama', 'gosta de mim',
      'ciúmes', 'traição', 'traiu', 'término', 'terminar', 'divórcio', 'voltar com',
    ],
    trabajo: [
      'trabalho', 'emprego', 'chefe', 'demitir', 'demissão', 'pedir demissão',
      'entrevista', 'cargo', 'escritório', 'colega', 'projeto', 'negócio',
      'carreira', 'promoção', 'contratado', 'demitido', 'empresa',
    ],
    dinero: [
      'dinheiro', 'grana', 'dívida', 'dívidas', 'poupança', 'poupar',
      'investimento', 'investir', 'empréstimo', 'salário', 'gastar', 'gasto',
      'compra', 'financeiro', 'finanças', 'orçamento', 'renda', 'lucro', 'contas',
    ],
  },
  modoCerrada: [
    'vai', 'vou', 'volta', 'voltará', 'devo', 'deveria', 'tenho que', 'funciona',
    'vai dar certo', 'me ama', 'gosta de mim', 'é certo', 'é boa ideia',
    'vale a pena', 'sim ou não', 'vai voltar', 'vou conseguir',
  ],
  preocupacion: [
    'medo', 'angústia', 'não sei', 'não consigo', 'perdi', 'dúvida', 'dúvidas',
    'ansiedade', 'ansiosa', 'ansioso', 'triste', 'tristeza', 'sofro', 'sofrer',
    'preocupa', 'preocupada', 'preocupado', 'assusta', 'sozinha', 'sozinho',
    'vazio', 'vazia', 'chorar', 'desesper', 'não aguento', 'cansada', 'cansado',
    'esgotada', 'esgotado', 'confusa', 'confuso', 'perdida', 'perdido',
  ],
  impulso: [
    'quero', 'vontade', 'animada', 'animado', 'começar', 'oportunidade',
    'desejo', 'sonho', 'ilusão', 'empolgada', 'empolgado', 'entusiasmo',
    'feliz', 'contente', 'esperança', 'ânimo', 'decidida', 'decidido',
    'nova etapa', 'empolgação',
  ],
  futuro: [
    'vai', 'vou', 'será', 'virá', 'devo', 'deveria', 'tenho que', 'futuro',
    'amanhã', 'próximo', 'próxima', 'adiante', 'algum dia', 'vai voltar', 'vai dar',
  ],
  pasado: [
    'foi', 'era', 'aconteceu', 'passado', 'antes', 'meu ex', 'minha ex',
    'o que fiz', 'tinha', 'tive', 'terminou', 'foi embora', 'me arrependo',
    'já não', 'costumava', 'perdi',
  ],
  tercero: [
    'meu ex', 'minha ex', 'meu parceiro', 'minha parceira', 'meu namorado',
    'minha namorada', 'meu chefe', 'minha chefe', 'meu marido', 'minha esposa',
    'minha mãe', 'meu pai', 'meu irmão', 'minha irmã', 'meu amigo', 'minha amiga',
    'meu colega', 'minha colega', 'essa pessoa', 'aquela pessoa', 'alguém',
    'com ele', 'com ela', ' ele ', ' ela ',
  ],
};

const it: BancoDeteccion = {
  tema: {
    amor: [
      'amore', 'partner', 'relazione', 'il mio ex', 'la mia ex', ' ex ', 'cotta',
      'cuore', 'sentimenti', 'matrimonio', 'sposarmi', 'sposare', 'fidanzato',
      'fidanzata', 'mi ama', 'gelosia', 'geloso', 'gelosa', 'tradimento',
      'tradito', 'lasciarci', 'divorzio', 'tornare insieme', 'innamorat',
    ],
    trabajo: [
      'lavoro', 'lavorativo', 'capo', 'impiego', 'licenziarmi', 'dimissioni',
      'colloquio', 'posto', 'ufficio', 'collega', 'progetto', 'azienda',
      'carriera', 'promozione', 'assunto', 'licenziato',
    ],
    dinero: [
      'soldi', 'denaro', 'debito', 'debiti', 'risparmi', 'risparmiare',
      'investimento', 'investire', 'prestito', 'stipendio', 'spendere', 'spesa',
      'acquisto', 'finanziario', 'finanze', 'reddito', 'guadagno', 'conti',
    ],
  },
  modoCerrada: [
    'tornerà', 'devo', 'dovrei', 'conviene', 'funziona', 'funzionerà', 'mi ama',
    'è giusto', 'è una buona idea', 'ne vale la pena', 'sì o no', 'ce la farò',
    'dovrò', 'andrà',
  ],
  preocupacion: [
    'paura', 'angoscia', 'non so', 'non riesco', 'ho perso', 'dubbio', 'dubbi',
    'ansia', 'ansioso', 'ansiosa', 'triste', 'tristezza', 'soffro', 'soffrire',
    'preoccupa', 'preoccupato', 'preoccupata', 'spaventa', 'sola', 'solo',
    'vuoto', 'vuota', 'piangere', 'dispera', 'non ce la faccio', 'stanca',
    'stanco', 'esausta', 'esausto', 'confusa', 'confuso', 'persa', 'perso',
  ],
  impulso: [
    'voglio', 'voglia', 'entusiasta', 'iniziare', 'cominciare', 'opportunità',
    'desiderio', 'sogno', 'entusiasmo', 'felice', 'contenta', 'contento',
    'speranza', 'motivata', 'motivato', 'deciso', 'decisa', 'nuova fase',
    "non vedo l'ora",
  ],
  futuro: [
    'andrà', 'sarà', 'tornerà', 'devo', 'dovrei', 'futuro', 'domani', 'prossimo',
    'prossima', 'avanti', 'un giorno', 'ce la farò', 'verrà',
  ],
  pasado: [
    'era', 'è stato', 'è successo', 'passato', 'prima', 'il mio ex', 'la mia ex',
    'quello che ho fatto', 'avevo', 'ho avuto', 'è finita', 'è finito',
    "se n'è andato", "se n'è andata", 'mi pento', 'non più', 'una volta', 'ho perso',
  ],
  tercero: [
    'il mio ex', 'la mia ex', 'il mio partner', 'la mia partner', 'il mio ragazzo',
    'la mia ragazza', 'il mio capo', 'la mia capa', 'mio marito', 'mia moglie',
    'mia madre', 'mio padre', 'mio fratello', 'mia sorella', 'mio amico',
    'mia amica', 'mio collega', 'mia collega', 'quella persona', 'questa persona',
    'qualcuno', 'con lui', 'con lei', ' lui ', ' lei ',
  ],
};

export function obtenerDeteccion(idioma: IdiomaConcreto): BancoDeteccion {
  switch (idioma) {
    case 'en':
      return en;
    case 'pt':
      return pt;
    case 'it':
      return it;
    default:
      return es;
  }
}
