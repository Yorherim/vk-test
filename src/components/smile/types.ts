import { ComponentProps } from 'react';
import { ResultGame } from '../../store/types';

type SmileType = 'happy' | 'happy-clicked' | 'surprised' | 'with-glasses' | 'sad';

export type SmileStyle = Record<SmileType, string>;

export type SmileProps = ComponentProps<'div'> & {
  smile: SmileType;
  resultGame: ResultGame;
  cellClicked: boolean;
};
