export enum AlphabetSections {
  NUMBER = 'number',
  RUSSIAN = 'russian',
  ENGLISH = 'english',
}

const { NUMBER, RUSSIAN, ENGLISH} = AlphabetSections;

export type AlphabetData = {
  [NUMBER]: string[];
  [RUSSIAN]: string[];
  [ENGLISH]: string[];
}
