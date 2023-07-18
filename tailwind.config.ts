import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

const colors = [
  'cyan',
  'green',
  'blue',
  'purple',
  'red',
  'pink',
  'orange',
  'indigo',
  'yellow',
]

const safelist = [
  ...colors.map(v => `text-${v}-500`),
  ...colors.map(v => `ring-${v}-500`),
  ...colors.map(v => `shadow-${v}-500/20`),
  ...colors.map(v => `hover:bg-${v}-500/10`),
  ...colors.map(v => `hover:text-${v}-500`),
]

export default <Partial<Config>>{
  safelist,
  theme: {
    fontFamily: {
      sans: ['DM Sans', defaultTheme.fontFamily.sans],
      serif: ['DM Serif Display', defaultTheme.fontFamily.serif],
      mono: ['DM Mono', defaultTheme.fontFamily.mono],
    },
    extend: {
      gridColumn: {
        '2/3': '2 / 3',
      },
      keyframes: {
        swing: {
          '20%': {
            transform: 'rotate3d(0, 0, 1, 15deg)',
          },
          '40%': {
            transform: 'rotate3d(0, 0, 1, -10deg)',
          },
          '60%': {
            transform: 'rotate3d(0, 0, 1, 5deg)',
          },
          '80%': {
            transform: 'rotate3d(0, 0, 1, -5deg)',
          },
          'to': {
            transform: 'rotate3d(0, 0, 1, 0deg)',
          },
        },
      },
      animation: {
        swing: 'swing 1s linear 1',
      },
    },
  },

  plugins: [
    typography(),
  ],
}
