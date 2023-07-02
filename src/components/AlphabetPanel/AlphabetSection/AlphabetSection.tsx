import React, { FC, useState } from 'react';

import { AlphabetData, AlphabetSectionLabels, AlphabetSectionsType } from '../../../constants/Aphabet';
import { getAlphabetSection, saveAlphabetSection } from '../../../api/alphabetService';

import styles from '../AlphabetPanel.module.scss';

export type AlphabetSectionProps = {
  alphabet: AlphabetData;
  section: AlphabetSectionsType;
  onClick: (sign: string) => void;
}

const AlphabetSection: FC<AlphabetSectionProps> = ({ alphabet, section, onClick }) => {
  const [expanded, setExpanded] = useState<boolean>(() => getAlphabetSection(section));

  const onSectionClick = (section: AlphabetSectionsType) => {
    saveAlphabetSection(section, !expanded);
    setExpanded((prevState) => !prevState);
  };

  return alphabet[section].length ? (
    <>
      <div className={styles.section} onClick={() => onSectionClick(section)}>{AlphabetSectionLabels[section]}</div>
      {expanded && alphabet[section].map((sign) => (
        <div key={`sign-${sign}`} className={styles.sign} onClick={() => onClick(sign)}>
          {sign}
        </div>
      ))}
    </>
  ) : null;
};

export default AlphabetSection;
