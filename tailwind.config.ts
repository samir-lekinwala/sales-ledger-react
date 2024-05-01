// export default {
//   content: ['./*.html', './client/**/*.[tj]sx'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// import withMT from '@material-tailwind/react/utils/withMT'

// export default withMT({
//   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
//   theme: {
//     extend: {

//     },
//   },
//   plugins: [],
// })

import type { Config } from 'tailwindcss'
import withMT from '@material-tailwind/react/utils/withMT'

const config: Config = {
  content: [
    './client/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace'],
        // sans: ['var(--font-manrope)'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        'semi-bold': '600',
        bold: '700',
      },
      // colors: {
      //   // Absolute Colors
      //   white: '#FFFFFF',
      //   black: '#000000',
      // },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
}
const withMaterialTailwind = withMT(config)

export default withMaterialTailwind
