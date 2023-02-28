import { FC, ReactNode } from 'react';

import styles from './wrapper.module.scss';

type WrapperProps = {
  children: ReactNode[];
};

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      {children.map((child, i) => (
        // children are static, so can safely use the index here
        <div key={i} className={styles.box}>
          {child}
        </div>
      ))}
    </div>
  );
};
