import { sortByLocal, sortSongByLocal } from '../utils/stringHelper';
import { charArrayToAlphabetData } from '../containers/Song/helper';
import { AUTHORS_UNION_BLOCK } from './common';
import songsJsonData from './songs.json';
import mp3JsonData from './music.json';

export type ISongRow = {
  line: string;
  isChordsRow?: boolean;
};

export enum Genre {
  ALL,
  NEUTRAL,
  FUNNY,
  SAD
}

export interface ISong {
  authors: string[];
  authorsName: string;
  name: string;
  pathname: string;
  favorite: boolean;
  genre: Genre[];
  songAlphabet: string;
  authorsAlphabet: string[];
  mp3?: string | null;
}

export const SongList: ISong[] = songsJsonData.map((pathname) => {
  const pattern = / - |(_f_)?.txt$/;
  const [authorsName, , name, favorite] = pathname.split(pattern);
  const authors = authorsName.split(AUTHORS_UNION_BLOCK);
  const mp3 = mp3JsonData.find((value) => value === `${authorsName} - ${name}.mp3`);
  const song: ISong = ({
    authors,
    authorsName,
    name,
    pathname,
    favorite: !!favorite,
    genre: [Genre.ALL],
    songAlphabet: name.charAt(0).toUpperCase(),
    authorsAlphabet: Array.from(new Set(authors.map((el) => el.charAt(0).toUpperCase()))),
    mp3,
  });

  return song;
}).sort(sortSongByLocal);

export const FavoriteSongList: ISong[] = SongList.filter(({ favorite }) => favorite);

export type ISongListByAuthors = Record<string, ISong[]>;

const UnsortedSongListByAuthors = SongList.reduce<ISongListByAuthors>((accumulator, song) => {
  const { authors } = song;
  authors.forEach((author) => {
    if (!accumulator[author]) {
      accumulator[author] = [];
    }
    accumulator[author].push(song);
  });

  return accumulator;
}, {});

export const SongDictionaryByAuthors = Object.keys(UnsortedSongListByAuthors)
  .sort(sortByLocal)
  .reduce<ISongListByAuthors>((accumulator, key) => {
    accumulator[key] = UnsortedSongListByAuthors[key];

    return accumulator;
  }, {});

export const FavoriteSongDictionaryByAuthors = Object.keys(SongDictionaryByAuthors)
  .reduce<ISongListByAuthors>((accumulator, key) => {
    if (SongDictionaryByAuthors[key].find(({favorite}) => favorite)) {
      accumulator[key] = SongDictionaryByAuthors[key];
    }

    return accumulator;
  }, {});

export const AuthorsAlphabet = charArrayToAlphabetData(
  Array.from(
    new Set(
      SongList.reduce<string[]>(
        (acc, { authorsAlphabet}) => acc.concat(authorsAlphabet), []
      )))
    .sort(sortByLocal));

export const FavoriteAuthorsAlphabet = charArrayToAlphabetData(
  Array.from(
    new Set(
      FavoriteSongList.reduce<string[]>(
        (acc, { authorsAlphabet}) => acc.concat(authorsAlphabet), []
      )))
    .sort(sortByLocal));

export const SongsAlphabet = charArrayToAlphabetData(Array.from(new Set(SongList.map(({ songAlphabet}) => songAlphabet))).sort(sortByLocal));

export const FavoriteSongsAlphabet = charArrayToAlphabetData(Array.from(new Set(FavoriteSongList.map(({ songAlphabet}) => songAlphabet))).sort(sortByLocal));
