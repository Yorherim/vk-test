import { ComponentProps, FC } from 'react';

import styles from './container.module.css';

export const Container: FC<ComponentProps<'div'>> = ({ className, ...rest }) => {
  return <div className={`${styles.container} ${className}`} {...rest} />;
};
