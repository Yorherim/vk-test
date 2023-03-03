import { FC } from 'react';

import styles from './smile.module.scss';
import { SmileProps, SmileStyle } from './types';

export const Smile: FC<SmileProps> = ({
  smile,
  resultGame,
  className,
  ...rest
}) => {
  const smileStyle: SmileStyle = {
    happy: styles.smile__happy,
    'happy-clicked': styles['smile__happy-clicked'],
    surprised: styles.smile__surprised,
    'with-glasses': styles['smile__with-glasses'],
    sad: styles.smile__sad,
  };

  const setSmileStyle = () => {
    switch (resultGame) {
      case 'lose':
        return smileStyle.sad;
      case 'win':
        return smileStyle['with-glasses'];
      default:
        return smileStyle.happy;
    }
  };

  return (
    <div
      className={`${styles.smile} ${setSmileStyle()} ${className}`}
      {...rest}
    />
  );
};
