import { sortByLocal, sortSongByLocal } from '../utils/stringHelper';
import { charArrayToAlphabetData } from '../containers/Song/helper';
import songsJsonData from './songs.json';
import songListJsonData from './songs-list.json';

export type ISongRow = {
  line: string;
  isChordsRow?: boolean;
};

export interface ISong {
  name: string;
  lyrics: ISongRow[];
  speed?: number;
}

export interface IStoredSong {
  path: string;
  speed?: number;
}

export interface IExtendedStoredSong extends IStoredSong {
  author: string;
  name: string;
}

type ISongList = Record<string, IStoredSong>;

type ISongListWithExtendedData = Record<string, IExtendedStoredSong>;

type IStoredSongsByAuthors = Record<string, ISongList>;

export const SongsByAuthorsData: IStoredSongsByAuthors = songsJsonData;

export const UnsortedSongsData = Object.keys(SongsByAuthorsData).reduce<ISongListWithExtendedData>((songs, author) => {
  Object.keys(SongsByAuthorsData[author]).forEach((name) => {
    songs[`${name} - ${author}`] = {...SongsByAuthorsData[author][name], author, name };
  });
  return songs;
}, {});

export const SongsData= Object.keys(UnsortedSongsData).sort(sortByLocal).reduce<ISongListWithExtendedData>((sortedSongs, key) => {
  sortedSongs[key] = UnsortedSongsData[key];
  return sortedSongs;
}, {});

export const SongsDataKeys = Object.keys(SongsData).sort(sortByLocal);

export const AuthorsDataKeys = Object.keys(SongsByAuthorsData).sort(sortByLocal);

// export const FavoriteSongs = Object.keys(SongsData).reduce<ISongListWithExtendedData>((songs, song) => {}, );
// console.log(songListJsonData[2]);
// const SongList: ISongList = {};
// console.log(SongList);

export enum Genre {
  NEUTRAL,
  FUNNY,
  SAD
}

export type NewSong = {
  authors: string[];
  authorsName: string;
  name: string;
  pathname: string;
  favorite: boolean;
  genre: Genre[];
  songAlphabet: string;
  authorsAlphabet: string[];
}

export const SongList: NewSong[] = songListJsonData.map((pathname) => {
  const pattern = / - |(_f_)?.txt$/;
  const [authorsName, , name, favorite] = pathname.split(pattern);
  const authors = authorsName.split(' feat. ');
  const song: NewSong = ({
    authors,
    authorsName,
    name,
    pathname,
    favorite: !!favorite,
    genre: [Genre.NEUTRAL],
    songAlphabet: name.charAt(0).toUpperCase(),
    authorsAlphabet: Array.from(new Set(authors.map((el) => el.charAt(0).toUpperCase())))
  });

  return song;
}).sort(sortSongByLocal);

export type ISongListByAuthors = Record<string, NewSong[]>;

const SongListByAuthors = SongList.reduce<ISongListByAuthors>((accumulator, song) => {
  const { authors } = song;
  authors.forEach((author) => {
    if (!accumulator[author]) {
      accumulator[author] = [];
    }
    accumulator[author].push(song);
  });

  return accumulator;
}, {});

export const SortedSongListByAuthors = Object.keys(SongListByAuthors)
  .sort(sortByLocal)
  .reduce<typeof SongListByAuthors>((accumulator, key) => {
    accumulator[key] = SongListByAuthors[key];

    return accumulator;
  }, {});

export const AuthorsAlphabet = charArrayToAlphabetData(Array.from(new Set(SongList.reduce<string[]>((acc, { authorsAlphabet}) => acc.concat(authorsAlphabet), []))).sort(sortByLocal));

export const SongsAlphabet = charArrayToAlphabetData(Array.from(new Set(SongList.map(({ songAlphabet}) => songAlphabet))).sort(sortByLocal));
