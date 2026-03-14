// Add this under theme.extend in tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        bam: {
          black: '#161311',
          ink: '#2C211F',
          cream: '#FFFAF3',
          sand: '#F6EFE2',
          paper: '#FFFDF8',
          white: '#FDFAFB',
          sage: '#5B6B55',
          red: {
            DEFAULT: '#C62144',
            50: '#FDE8EC',
            100: '#F8C5CF',
            200: '#F19AAA',
            300: '#EA6F86',
            400: '#E34867',
            500: '#C62144',
            600: '#A61C39',
            700: '#87172E',
            800: '#671223',
            900: '#480D18'
          },
          orange: {
            DEFAULT: '#E26426',
            50: '#FEF0E9',
            100: '#FCD8C7',
            200: '#F9BC9E',
            300: '#F59E74',
            400: '#F08352',
            500: '#E26426',
            600: '#C95520',
            700: '#A3451A',
            800: '#7D3414',
            900: '#57230D'
          },
          yellow: {
            DEFAULT: '#F8BE05',
            50: '#FFF8E1',
            100: '#FEEFB8',
            200: '#FDE68F',
            300: '#FCDD66',
            400: '#FAD03C',
            500: '#F8BE05',
            600: '#D49F04',
            700: '#A67D03',
            800: '#785902',
            900: '#4B3601'
          },
          burgundy: {
            DEFAULT: '#530A1D',
            50: '#F6E6EA',
            100: '#E4BCC6',
            200: '#D08F9F',
            300: '#BB6277',
            400: '#A73C56',
            500: '#530A1D',
            600: '#470819',
            700: '#3A0614',
            800: '#2E040F',
            900: '#21030A'
          }
        }
      },
      backgroundImage: {
        'bam-gradient': 'linear-gradient(135deg,#530A1D 0%,#921234 30%,#C62144 55%,#E26426 80%,#F8BE05 100%)'
      },
      boxShadow: {
        glow: '0 10px 30px rgba(248,190,5,.25)',
        bam: '0 18px 50px rgba(44,33,31,.12)'
      }
    }
  }
};
