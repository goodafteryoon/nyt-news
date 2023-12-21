import 'styled-components';

import { Color } from 'styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Color;
  }
}
