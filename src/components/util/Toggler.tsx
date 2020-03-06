import React from 'react';

/*== Toggler =====================================================

A utility component that allows you to toggle between two components.
Useful for UI and rendering icons depending on a certain state.

Props:
  state: boolean
    the condition that determines which component will render
  on: React Component
    the "on" component
  off: React Component
    the "off" component

*/

interface Props {
  state: boolean;
  on: React.ComponentType;
  off: React.ComponentType;
}

const Toggler: React.FC<Props> = ({ state, on: CompA, off: CompB }) => {
  return state ? <CompA /> : <CompB />;
};

export default Toggler;
