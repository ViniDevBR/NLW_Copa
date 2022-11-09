/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      colors: {
        slate: {
          950: '#202024'
        },
        gray: {
          100: '#E1E1E6',
          450: '#8D8D99',
          850: '#323238',
          900: '#121214'
        },
        green: {
          650: '#129e57'
        },
        yellow: {
          450: '#F7DD43'
        }
      }
    },
  },
  plugins: [],
}
