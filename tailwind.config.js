/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '744px',
      lg: '1133px',
      xl: '1440px',
      short: {
        raw: '(min-height: 720px)'
      },
      average: {
        raw: '(min-height: 920px)'
      },
      tall: {
        raw: '(min-height: 1120px)'
      },
      mobile: {
        raw: '(max-height: 890px) and (max-width: 479px)'
      }
    },
    colors: {
      primary: '#05060F',
      secondary: '#4F33FF',
      neutral: '#EF4343',
      'base-100': '#2A303C',
      tertiary: {
        'violet-red-60': '#F6097A',
        'carnation-60': '#EF4343',
        'dodger-blue-60': '#3991F9'
      },
      // deadly typo
      indictor: {
        success: '#4BB543',
        warning: '#FFB41F',
        error: '#FF3333'
      },
      grayscales: {
        'grey-20': '#333333',
        'grey-90': '#E6E6E6',
        'dark-grey': '#888888'
      },
      white: '#FFFFFF',
      blue: {
        10: '#070033',
        20: '#0E0066',
        30: '#150099',
        40: '#1C00CC',
        50: '#2300FF',
        60: '#4F33FF',
        70: '#4F33FF',
        80: '#A799FF',
        90: '#D3CCFF'
      },
      yellow: {
        10: '#312902',
        20: '#625304',
        30: '#937C06',
        40: '#C5A607',
        50: '#F6CF09',
        60: '#F8DB46',
        70: '#F9E26C',
        80: '#FBEC9D',
        90: '#FDF5CE'
      },
      'violet-red': {
        10: '#620430',
        20: '#620431',
        30: '#940549',
        40: '#C50762',
        50: '#F6097A',
        60: '#F83A95',
        70: '#FA6BAF',
        80: '#FB9DCA',
        90: '#fdcfe5'
      },
      carnation: {
        10: '#2F0404',
        20: '#5E0808',
        30: '#8D0C0C',
        40: '#BC1010',
        50: '#EA1515',
        60: '#EF4343',
        70: '#f7aaaa',
        80: '#F7A1A1',
        90: '#FBD0D0'
      },
      'dodger-blue': {
        10: '#021831',
        20: '#032F63',
        30: '#054794',
        40: '#065EC6',
        50: '#0876F7',
        60: '#3991F9',
        70: '#6BADFA',
        80: '#9CC8FC',
        90: '#CEE4FD',
        98: '#F5FAFF'
      },
      grey: {
        10: '#191919',
        20: '#333333',
        30: '#4C4C4C',
        40: '#666666',
        50: '#808080',
        60: '#999999',
        70: '#B3B3B3',
        80: '#B3B3B3',
        90: '#E6E6E6',
        98: '#FAFAFA'
      },
      black: '#000000'
    },
    fontFamily: {
      inter: ['inter', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      backgroundImage: {
        registration_sidepanel_logo: 'url("/public/images/Logo.svg")',
        registration_sidepanel_bg: 'url("/public/images/LeftPanel.png")',
        messageSent: 'url("/public/images/MessageSent.png")',
        registrationLoading: 'url("/public/images/registrationLoading.gif")',
        teamWhoWonBg: 'url("/public/images/GamesWinnerCelebration.png")'
      },
      boxShadow: {
        'primary-hover': '0px 12px 24px rgba(79, 51, 255, 0.24)',
        'secondary-hover': '0px 4px 4px rgba(223, 223, 223, 0.3), 0px -2px 4px rgba(199, 199, 199, 0.2)',
        'select-fields-hover': '0px -3px 6px 0px rgba(0, 0, 0, 0.09);'
      },
      gridTemplateColumns: {
        gridWithDivider: '1fr 24px 1fr 24px 1fr'
      },
      spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '48px',
        12: '56px',
        13: '64px',
        14: '80px',
        15: '96px',
        16: '128px',
        17: '160px'
      }
    }
  },
  daisyui: {
    themes: [
      {
        weplayTheme: {
          primary: '#05060F',
          secondary: '#4F33FF',
          accent: '#4598F9',
          neutral: '#E6E6E6',
          'base-100': '#FFFFFF',
          info: '#333333',
          success: '#4BB543',
          warning: '#FFB41F',
          error: '#FF3333',
          grayed: '#E6E6E6'
        }
      }
    ]
  },
  plugins: [
    require('daisyui')
  ]
};
