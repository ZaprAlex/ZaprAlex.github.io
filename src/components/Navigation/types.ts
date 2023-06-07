export interface INavigation {
  goBack: () => void;
  goRoot: () => void;
  goToSongs: (char?: string) => void;
  goToAuthor: (author: string) => void;
  goToAuthors: (char?: string) => void;
  goToSong: (author: string, name: string) => void;
  goToChords: () => void;
  goToChord: (chord: string) => void;
  goTo404: () => void;
}
