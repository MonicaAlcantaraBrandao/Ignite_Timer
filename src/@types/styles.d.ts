// .d = dentro desse arquivo so vai ter códigos de definição de tipos do ts
// é necessário importar o styled para sobrescrever algo, pq se não seria como estivesse criando do 0 as definições do mesmo
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

// mostrar opções de temas disponíveis

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
