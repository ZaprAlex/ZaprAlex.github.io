import { AlphabetData, AlphabetSections } from '../../constants/Aphabet';
import { ISongRow } from '../../constants/SongsData';
import { getTextWidth } from '../../utils/canvasHelper';

export function isChorusLine(line: string) {
  return line.match(/^(Припев|Chorus):/i);
}

const { NUMBER, RUSSIAN, ENGLISH} = AlphabetSections;

export function charArrayToAlphabetData(chars: string[]) {
  return chars.reduce<AlphabetData>((obj, elem) => {
    if (elem.match(/[0-9]/i)) {
      obj[NUMBER].push(elem);
    } else if (elem.match(/[а-я]/i)) {
      obj[RUSSIAN].push(elem);
    } else if (elem.match(/[a-z]/i)) {
      obj[ENGLISH].push(elem);
    }
    return obj;
  }, { number: [], russian: [], english: [] });
}

export function generateLyrics(lyrics: ISongRow[], fontSize: number){
  const screenWidth = window.innerWidth - 32;
  const newLyrics: ISongRow[] = [];

  const calcWidth = (line: string) => getTextWidth(line, fontSize);

  // console.log(lyrics);
  for (let i = 0; i < lyrics.length; ++i) {
    const { line, isChordsRow } = lyrics[i];
    const lineWidth = calcWidth(line);
    const trimmedLine = line.trim();

    if (trimmedLine === '\n' || !trimmedLine.length) {
      newLyrics.push({ line });
      continue;
    }

    if (isChordsRow && i + 1 < lyrics.length && !lyrics[i + 1].isChordsRow) {
      let chordsLine = line;
      let songLine = lyrics[i + 1].line;
      const songLineWidth = calcWidth(songLine);

      if (songLineWidth > screenWidth) {
        const delta = Math.round(songLine.length * screenWidth / songLineWidth);

        while (songLine.length || chordsLine.length) {
          const lastSpaceIndexInSongPart = songLine.lastIndexOf(' ', delta);

          if (chordsLine.length) {
            // TODO: проверить перенос посередине аккорда
            const lastSpaceIndexInChordsPart = chordsLine.length > delta ? chordsLine.lastIndexOf(' ', songLine.length > 1 ? lastSpaceIndexInSongPart : delta) : -1;
            const chordsLinePart = chordsLine.substring(0, (lastSpaceIndexInChordsPart === -1 ? chordsLine.length : lastSpaceIndexInChordsPart) + 1);
            newLyrics.push({line: chordsLinePart, isChordsRow: true });
            chordsLine = lastSpaceIndexInChordsPart !== -1 ? chordsLine.substring(lastSpaceIndexInChordsPart + 1, chordsLine.length) : '';
          }

          if (songLine.length) {
            const songDelta = lastSpaceIndexInSongPart === -1 || !chordsLine.length ? songLine.length : lastSpaceIndexInSongPart + 1;
            const songLinePart = songLine.substring(0, songDelta);
            newLyrics.push({line: songLinePart });
            songLine = songLine.length > songDelta ? songLine.substring(songDelta, songLine.length) : '';
          }
        }
        i++;
      } else if (lineWidth > screenWidth) {
        const delta = Math.round(chordsLine.length * screenWidth / lineWidth);

        while (chordsLine.length) {
          const lastSpaceIndex = chordsLine.lastIndexOf(' ', delta);
          const chordsLinePart = chordsLine.substring(0, (lastSpaceIndex === -1 ? chordsLine.length : lastSpaceIndex) + 1);
          newLyrics.push({line: chordsLinePart, isChordsRow: true });
          chordsLine = lastSpaceIndex !== -1 ? chordsLine.substring(lastSpaceIndex + 1, chordsLine.length) : '';
        }
      } else {
        newLyrics.push({ line, isChordsRow });
      }

      // TODO: переработать и избавиться от continue
      continue ;
    }

    newLyrics.push({ line, isChordsRow });
  }
  return newLyrics;
}
