import React, { FC, MouseEvent, useEffect, useState } from 'react';

import { AlphabetData, AlphabetSections } from '../../constants/Aphabet';
import { getAlphabetSection, saveAlphabetSection } from '../../api/alphabetService';

import styles from './AlphabetPanel.module.scss';

const { NUMBER, RUSSIAN, ENGLISH } = AlphabetSections;

type AlphabetPanelProps = {
  alphabet: AlphabetData;
  onClick: (sign: string) => void;
}

type State = {
  [NUMBER]?: boolean;
  [RUSSIAN]?: boolean;
  [ENGLISH]?: boolean;
}

const AlphabetPanel: FC<AlphabetPanelProps> = ({ alphabet, onClick }) => {
  const [state, setState] = useState<State>({});

  useEffect(() => {
    setState({
      [NUMBER]: getAlphabetSection(NUMBER),
      [RUSSIAN]: getAlphabetSection(RUSSIAN),
      [ENGLISH]: getAlphabetSection(ENGLISH)
    });
  }, []);

  const { number, russian, english } = state;
  const onSignClick = (event: MouseEvent, sign: string) => {
    // console.log(2);
    // event.stopPropagation();
    // console.log(3);
    onClick(sign);
  };

  const onSectionClick = (section: AlphabetSections) => {
    console.log(1);
    saveAlphabetSection(section, !state[section]);
    setState((prevState) => ({...prevState, [section]: !prevState[section] }));
  };

  return (
    <div className={styles.panel}>
      {alphabet[NUMBER].length && (
        <>
          <div className={styles.section} onClick={() => onSectionClick(NUMBER)}>0-9</div>
          {number && alphabet[NUMBER].map((sign) => (
            <div key={`sign-${sign}`} className={styles.sign} onClick={() => onClick(sign)}>
              {sign}
            </div>
          ))}
        </>
      )}
      {alphabet[RUSSIAN].length && (
        <>
          <div className={styles.section} onClick={() => onSectionClick(RUSSIAN)}>А-Я</div>
          {russian && alphabet[RUSSIAN].map((sign) => (
            <div key={`sign-${sign}`} className={styles.sign} onClick={() => onClick(sign)}>
              {sign}
            </div>
          ))}
        </>
      )}
      {alphabet[ENGLISH].length && (
        <>
          <div className={styles.section} onClick={() => onSectionClick(ENGLISH)}>A-Z</div>
          {english && alphabet[ENGLISH].map((sign) => (
            <div key={`sign-${sign}`} className={styles.sign} onClick={() => onClick(sign)}>
              {sign}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AlphabetPanel;
