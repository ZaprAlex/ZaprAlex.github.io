import { ISong, SongsByAuthorsData } from '../constants/SongsData';
import { getTrimmedRightString } from '../utils/stringHelper';

export async function getSong(author?: string, name?: string): Promise<ISong> {
  if (!author || !name || !SongsByAuthorsData[author]?.[name]) {
    return Promise.reject();
  }

  const path = `/songs/${SongsByAuthorsData[author][name].path}`;

  const file = await fetch(path);
  const text = await file.text();
  const lines = text.split('\n');

  return {
    name,
    lyrics: lines.map((line) => {
      if (line === `${author} - ${name}`) {
        return { line: ''};
      }

      if (line.match(/ _#$/)) {
        return { line: getTrimmedRightString(line.substring(0, line.length - 3)), isChordsRow: true };
      }

      const trimmedLine = getTrimmedRightString(line);
      return { line: !trimmedLine.length ? '\n' : trimmedLine };
    })
  };
}
