// Perguntas de Kick-off do Diagnóstico 360°
// Perguntas iniciais para contextualização da empresa antes do diagnóstico

export interface KickoffQuestion {
  number: number;
  question: string;
}

export const kickoffQuestions: KickoffQuestion[] = [
  {
    number: 1,
    question: 'Do que se trata teu negócio? Produto que vende',
  },
  {
    number: 2,
    question: 'Faturamento médio? Quantos funcionários?',
  },
  {
    number: 3,
    question: 'Quais suas principais responsabilidades hoje dentro do negócio? Como você se considera como empreendedor?',
  },
  {
    number: 4,
    question: 'Conte um pouco sobre a história da empresa.',
  },
  {
    number: 5,
    question: 'Consegue me deescrever o Organograma da empresa',
  },
  {
    number: 6,
    question: 'Qual obejtivos futuros com o negócio?',
  },
  {
    number: 7,
    question: 'Quais são as princiapais dores do teu negócio hoje? Porque procurou a O2?',
  },
  {
    number: 8,
    question: 'Você utiliza algum ERP para gestão? Nome',
  },
  {
    number: 9,
    question: 'Você possui alguma contabilidade? Interna ou Tercerizada?',
  },
];
