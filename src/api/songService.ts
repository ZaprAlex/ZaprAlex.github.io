import { ISongRow, ISong } from '../constants/SongsData';
import { getTrimmedRightString } from '../utils/stringHelper';

export async function getLyrics({ pathname, authorsName, name }: ISong): Promise<ISongRow[]> {
  const file = await fetch(`/songs/${pathname}`);
  const text = await file.text();
  const lines = text.split('\n');

  return lines.map((line) => {
    if (line.startsWith(`${authorsName} - ${name}`)) {
      return { line: ''};
    }

    if (line.match(/ _#$/)) {
      return { line: getTrimmedRightString(line.substring(0, line.length - 3)), isChordsRow: true };
    }

    const trimmedLine = getTrimmedRightString(line);
    return { line: !trimmedLine.length ? '\n' : trimmedLine };
  });
}
