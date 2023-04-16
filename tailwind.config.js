/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 10px 13px -7px #000, 5px 5px 15px 5px rgba(0,0,0,0)'
      },
      fontFamily: {
        code: ['Hasklig', 'Monospace']
      },
      colors: {
        default: '#d4d4d4',
        keyword: '#9cdcfe',
        type: '#4ec9b0',
        number: '#b5cea8',
        string: '#ce9178',
        boolean: '#569cd6',
        comment: '#6a9955',
        link: '#7bf06c',
        dark: '#1f1f1f'
      }
    }
  }
};
