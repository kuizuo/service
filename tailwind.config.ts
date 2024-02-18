import type { Config } from 'tailwindcss'
import svgToDataUri from 'mini-svg-data-uri'
import plugin from 'tailwindcss/plugin'

// eslint-disable-next-line ts/no-var-requires, ts/no-require-imports, @typescript-eslint/no-var-requires
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

export default <Partial<Config>>{
  darkMode: 'class',

  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'bg-grid': value => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' },
      )
    }),
  ],
}
