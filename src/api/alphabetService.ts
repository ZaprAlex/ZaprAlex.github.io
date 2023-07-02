import { AlphabetSectionsType } from '../constants/Aphabet';

const ALPHABET_KEY_PREFIX = 'expanded-alphabet-section-';

export function saveAlphabetSection(section: AlphabetSectionsType, value: boolean) {
  window.localStorage.setItem(ALPHABET_KEY_PREFIX + section, String(value));
}
export function getAlphabetSection(section: AlphabetSectionsType): boolean {
  return window.localStorage.getItem(ALPHABET_KEY_PREFIX + section) === 'true' || false;
}
