/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
      extend: {
         screens: {
            'lg': {'min': '(min-width: 414px)','raw': '(min-height: 814px)'},
            'sm': {'raw': '(max-width: 414px)','max': '(max-height: 814px)'}
         },
         blur: {
            40: '40px'
         },
         keyframes: {
            colorAnimation: {
               '0%': { color: '#ffffff77' },
               '50%': { color: 'rgb(255, 255, 255)' },
               '100%': { color: '#ffffff77' }
            },
            circlesAnimation: {
               '0%': { rotate: '0'},
               '100%': { rotate: '180deg'}
            }
         },
         animation: {
            colorAnimation: 'colorAnimation 5s ease-in-out infinite',
            circlesAnimation: 'circlesAnimation 8s ease-in-out infinite'
         },
         colors: {
            '0b0b0c' : '#0b0b0c',
            'ffffff77': '#ffffff77',
            'ffffff79': '#ffffff79',
            'ffffff5c': '#ffffff5c',
            'ffffff5a': '#ffffff5a',
            'F8F8F8': '#F8F8F8'
         },
         width: {
            400: '400px',
            300: '300px',
            130: '130px',
            72: '72px',
            66: '66px',
            30: '30px',
            25: '25px',
            23: '23px',
            22: '22px',
            21: '21px',
            19: '19px',
            15: '15px',
            17: '17px',
            9: '9px'
         },
         height: {
            700: '700px',
            600: '600px',
            90: '90px',
            72: '72px',
            70: '70px',
            66: '66px',
            60: '60px',
            40: '40px',
            3: '3px',
            '35%': '35%',
            '68%': '68%',
            '75%': '75%',
            '25%': '25%',
            '20%': '20%',
            '12%' : '12%',
         },
         borderRadius: {
            40: '40px',
            20: '20px',
         },
         padding:{
            30: '30px',
            27: '27px',
            26: '26px',
            25: '25px'
         },
         boxShadow: {
            coverImgShadow: '0 10px 28px -16px black'
         },
         fontFamily: {
            gothamBold : ['GothamBold'],
            gothamMedium : ['GothamMedium'],
            gothamThin : ['GothamThin']
         },
         fontSize: {
            headerTxtLg: '1.1rem',
            headerTxtSize: '.92rem',
            infoTxtSize: '.92rem',
            songNameLg: '1.8rem',
            songNameSize: '1.46rem',
            timeTxtLg: '.8rem',
            timeTxtSize: '.75rem',
            musicInfoLg: '1.05rem'
         },
         lineHeight: {
            17: '17px'
         },
         spacing: {
            '-10': '-10px',
            '-20': '-20px',
            '-30': '-30px'
         }
     },
   },
   plugins: [],
}