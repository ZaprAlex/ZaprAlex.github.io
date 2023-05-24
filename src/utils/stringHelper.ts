import { ChordsKeys } from '../constants/chords';

/**
 * Оригинальная регулярка:
 * /\b[A-G][b#]?(maj|min|m|M|\+|-|dim|aug)?\d*(sus)?\d*(\/[A-G][b#]?)?\b/g
 * Убран блок 'M' (так как в оригинальной отлавливалось в тексте 'FM') и добавлен блок для определения Cadd9
 * TODO: Как не отлавливать артикль и форму глагола to be ("Am I")?
 */
export const CHORD_REGEX_PATTERN =
  /\b[A-H][b#]?(maj|min|m|\+|-|dim|aug|add)?\d*(sus)?\d*(\/[A-G][b#]?)?\b/g;

/*
 ** Обозначение боя:
 ** ↧/↥ - обычный удар
 ** ⇓/⇑ - сильный удар
 ** ⇂/↾ - заглушка
 ** ⇣/⇡ - пустой удар (не касаясь струн)
 */
export function getChordsFromString(line: string) {
  return Array.from(
    new Set(line.split(/\b/).filter((word) => word.match(CHORD_REGEX_PATTERN)))
  ).filter((chord) => ChordsKeys.includes(chord));
}

export function encodeChord(chord: string) {
  return chord.replace(/#/g, '_').replace(/\//g, '-');
}

export function decodeChord(chord: string) {
  return chord.replace(/_/g, '#').replace(/-/g, '/');
}

export function isChordsRow(line: string): string[] {
  if (line.length) {
    const pattern = new RegExp(CHORD_REGEX_PATTERN);
    return line.match(pattern) ? ['chords_row'] : [];
  }
  return [];
}
