import { FC } from 'react';

import styles from './smile.module.scss';
import { SmileProps, SmileStyle } from './types';

export const Smile: FC<SmileProps> = ({ smile, resultGame, cellClicked, className, ...rest }) => {
  const smileStyle: SmileStyle = {
    happy: styles.smile__happy,
    'happy-clicked': styles['smile__happy-clicked'],
    surprised: styles.smile__surprised,
    'with-glasses': styles['smile__with-glasses'],
    sad: styles.smile__sad,
  };

  const setSmileStyle = () => {
    if (resultGame === 'lose') {
      return smileStyle.sad;
    }
    if (resultGame === 'win') {
      return smileStyle['with-glasses'];
    }
    if (cellClicked) {
      return smileStyle.surprised;
    }
    return smileStyle.happy;
  };

  return <div className={`${styles.smile} ${setSmileStyle()} ${className}`} {...rest} />;
};
