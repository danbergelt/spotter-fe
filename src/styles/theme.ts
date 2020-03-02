const breakpoints = [1500, 1000, 800, 500].map(
  bp => `@media (max-width: ${bp}px)`
);

export const theme = {
  fontSizes: [10, 12, 14, 16, 24, 32, 48, 64, 96, 128],
  colors: {
    reds: ['#e9503f', '#F1856D', '#ed3d34'],
    greens: ['#64c431', '#0ddd83'],
    blues: ['#0977f4', '#07ebf7'],
    yellows: ['#f2b202', '#ffd800'],
    grays: ['#202020', '#737373', '#e8e8e8', '#F2F2F2']
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  mq: {
    xl: breakpoints[0],
    lg: breakpoints[1],
    md: breakpoints[2],
    sm: breakpoints[3]
  },
  shadows: {
    box:
      '0 0 0 1px rgba(50, 50, 93, 0.075), 0 0 1px #e9ecef, 0 2px 4px -2px rgba(138, 141, 151, 0.6)'
  }
};
