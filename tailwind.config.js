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

// import { Config } from 'tailwindcss'
import withMT from '@material-tailwind/react/utils/withMT'

const config = {
  content: [
    './index.html',
    './client/**/*.{js,ts,jsx,tsx}',
    // './client/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './client/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'jersey-25': ['"Jersey 25"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        // custom1: ['custom'],
        // sans: ['var(--font-manrope)'],
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
