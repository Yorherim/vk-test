import { ComponentProps } from 'react';

type SmileType = 'happy' | 'happy-clicked' | 'surprised' | 'with-glasses' | 'sad';

export type SmileStyle = Record<SmileType, string>;

export type SmileProps = ComponentProps<'div'> & {
  smile: SmileType;
};
