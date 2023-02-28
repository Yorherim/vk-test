import { FC } from 'react';

import styles from './smile.module.scss';
import { SmileProps, SmileStyle } from './types';

export const Smile: FC<SmileProps> = ({ smile, className, ...rest }) => {
  const smileStyle: SmileStyle = {
    happy: styles.smile__happy,
    'happy-clicked': styles['smile__happy-clicked'],
    surprised: styles.smile__surprised,
    'with-glasses': styles['smile__with-glasses'],
    sad: styles.smile__sad,
  };

  return <div className={`${styles.smile} ${smileStyle[smile]} ${className}`} {...rest} />;
};
