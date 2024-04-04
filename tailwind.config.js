// export default {
//   content: ['./*.html', './client/**/*.[tj]sx'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
})
