import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const HEIGHT = Math.floor(height / 3);

export const HEIGHT_VARIATIONS = [
  HEIGHT,
  HEIGHT * 1.2,
  HEIGHT * 0.9,
]

export const PADDING = 5;
