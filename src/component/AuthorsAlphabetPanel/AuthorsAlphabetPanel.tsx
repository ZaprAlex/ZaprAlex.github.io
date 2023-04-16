import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { SongsData } from '../../constants/SongsData';
import { ROUTE } from "../../constants/route";

import styles from './AuthorsAlphabetPanel.module.scss';

const AuthorsAlphabetPanel: FC = () => {
    const history = useHistory();
    const alphabet = Array.from(new Set(Object.keys(SongsData).map((author) => author.charAt(0))));

    function onSignClick(sign: string) {
        history.push(`${ROUTE.SONGS}/?char=${sign}`);
    }

    return (
        <div className={styles.panel}>
            {alphabet.map((sign) => (
                <div key={`sign-${sign}`} className={styles.sign} onClick={() => onSignClick(sign)}>
                    {sign}
                </div>
            ))}
        </div>
    );
};

export default AuthorsAlphabetPanel;
