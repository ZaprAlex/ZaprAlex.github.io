import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Chords, IChord } from '../../../constants/chords';
import { useAppNavigation } from '../../../components/Navigation';
import { decodeChord } from '../../../utils/stringHelper';
import Chord from '../Chord';

type Params = {
  chordName?: string;
};

const ChordProvider: FC = () => {
  const { goTo404 } = useAppNavigation();
  const { chordName = '' } = useParams<Params>();
  const [chord, setChord] = useState<IChord | null>(null);

  useEffect(() => {
    (async () => {
      const chord = decodeChord(chordName);
      if (Object.keys(Chords).includes(chord)) {
        setChord(Chords[chord]);
      } else {
        goTo404();
      }
    })();
  }, [chordName, goTo404]);

  return chord ? <Chord chord={chord} /> : null;
};

export default ChordProvider;
