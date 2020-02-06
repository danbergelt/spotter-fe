// eslint-disable-next-line
const css = require('../../styles/variables.scss');

export const styles = {
  bmBurgerButton: {
    position: 'absolute',
    width: '14px',
    height: '12px',
    left: '90%',
    zIndex: '0'
  },
  bmBurgerBars: {
    background: css.gray1
  },
  bmBurgerBarsHover: {
    background: css.gray3
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    zIndex: '2000'
  },
  bmCross: {
    background: css.gray2
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: css.gray3,
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    position: 'relative',
    bottom: '20px',
    zIndex: '1999'
  },
  bmMorphShape: {},
  bmItemList: {
    outline: '0'
  },
  bmItem: {
    outline: '0'
  },
  bmOverlay: {
    background: 'rgba(0.0, 0.0, 0.0, 0.3)',
    bottom: '0px',
    marginLeft: '-25px'
  }
};
