import { useState } from 'react';

/*== useTabs =====================================================

Utility hook that pairs with the custom Tabs component. All this hook
does is store tab state externally, and allows the parent to access
current tab state and set initial state. This is to retain flexibility
for user --> parent needs access to this state to shortcircuit other
components, create side effects, etc.

Params:
  initial: string
    the initial active tab on component render

*/
type ReturnValue = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  string
];

export default (initial: string): ReturnValue => {
  const [active, setActive] = useState(initial);

  return [active, setActive, initial];
};
