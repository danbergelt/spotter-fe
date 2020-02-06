// utility function to darken a CSS in JS hex code color

interface Params {
  (color: string, amount: number): string;
}

const adjust: Params = (color, amount) => {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, color =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
};

export default adjust;
