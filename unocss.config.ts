import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

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

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-cyan-500'],
    ['nav-btn', 'px-3 py-2 flex items-center gap-1 text-sm text-white bg-green-4 rounded-1 border-transparent rounded-2 font-medium transition duration-200 ease-in-out hover:bg-green-5 focus:ring-2 focus:ring-gray-2'],
  ],
  safelist,
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
