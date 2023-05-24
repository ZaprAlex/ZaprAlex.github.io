export interface INavigation {
  goBack: () => void;
  goRoot: () => void;
  goToSongs: () => void;
  goToAuthor: (author: string) => void;
  goToSong: (author: string, name: string) => void;
  goToSign: (sign: string) => void;
  goToChords: () => void;
  goToChord: (chord: string) => void;
  goTo404: () => void;
}
