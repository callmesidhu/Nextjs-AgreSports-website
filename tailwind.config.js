// tailwind.config.js

module.exports = {
      theme: {
        extend: {
          keyframes: {
            dotsMove: {
              '0%': { backgroundPosition: '0 0' },
              '100%': { backgroundPosition: '40px 40px' },
            },
            colorShift: {
              '0%': { filter: 'hue-rotate(0deg)' },
              '100%': { filter: 'hue-rotate(360deg)' },
            },
          },
          animation: {
            dotsMove: 'dotsMove 10s linear infinite',
            colorShift: 'colorShift 6s linear infinite',
          },
        },
      },
      plugins: [],
    }
    