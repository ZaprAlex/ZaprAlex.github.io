import { sortByLocal } from '../utils/stringHelper';
import songsJsonData from './songs.json';

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

export const AuthorsAlphabet = Array.from(new Set(Object.keys(SongsByAuthorsData).sort(sortByLocal).map((author) => author.charAt(0).toUpperCase())));

export const SongsAlphabet = Array.from(new Set(Object.keys(SongsData).map((author) => author.charAt(0).toUpperCase())));

export const SongsDataKeys = Object.keys(SongsData).sort(sortByLocal);

export const AuthorsDataKeys = Object.keys(SongsByAuthorsData).sort(sortByLocal);
