import { FC } from 'react';

import styles from './wrapper.module.scss';

export const Wrapper: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box} />
      <div className={styles.box} />
    </div>
  );
};
