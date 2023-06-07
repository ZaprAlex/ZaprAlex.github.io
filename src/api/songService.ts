import { ISong, SongsByAuthorsData } from '../constants/SongsData';
import { isChordsRow } from '../utils/stringHelper';

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
        return [];
      }
      return [!line.length ? '\n' : line, ...isChordsRow(line)];
    })
  };
}
