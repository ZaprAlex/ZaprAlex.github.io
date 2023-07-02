export enum AlphabetSectionsType {
  NUMBER = 'number',
  RUSSIAN = 'russian',
  ENGLISH = 'english',
}

const { NUMBER, RUSSIAN, ENGLISH} = AlphabetSectionsType;

export type AlphabetData = {
  [NUMBER]: string[];
  [RUSSIAN]: string[];
  [ENGLISH]: string[];
}

export const AlphabetSectionLabels = {
  [NUMBER]: '0-9',
  [RUSSIAN]: 'А-Я',
  [ENGLISH]: 'A-Z',
};
