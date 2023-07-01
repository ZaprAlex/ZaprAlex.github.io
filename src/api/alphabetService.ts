import { AlphabetSections } from '../constants/Aphabet';

const ALPHABET_KEY_PREFIX = 'alphabet-';

export function saveAlphabetSection(section: AlphabetSections, value: boolean) {
  window.localStorage.setItem(ALPHABET_KEY_PREFIX + section, String(value));
}
export function getAlphabetSection(section: AlphabetSections): boolean {
  return window.localStorage.getItem(ALPHABET_KEY_PREFIX + section) === 'true' || false;
}
