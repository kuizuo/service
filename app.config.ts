import { _colors, _fontFamily } from '#tailwind-config/theme.mjs'

export default defineAppConfig({
  naiveui: {
    themeConfig: {
      shared: {
        common: {
          fontFamily: _fontFamily.sans.join(', '),
        },
      },
      light: {
        common: {
          primaryColor: _colors.teal[600],
          primaryColorHover: _colors.teal[500],
          primaryColorPressed: _colors.teal[700],
        },
      },
      dark: {
        common: {
          primaryColor: _colors.teal[500],
          primaryColorHover: _colors.teal[400],
          primaryColorPressed: _colors.teal[600],
          bodyColor: _colors.slate[800],
        },
        Layout: {
          siderColor: _colors.slate[800],
          headerColor: _colors.slate[800],
          footerColor: _colors.slate[800],
        },
      },
    },
  },
})
