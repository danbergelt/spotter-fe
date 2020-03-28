import { useState, useEffect } from 'react';

/*== useDelayUnmount =====================================================

Custom hook that delays a react component from unmounting. Allows us to pin
some side effects to an unmounting component (such as animations), or to run
side effects alongsize an unmounting component

Params:
  isMounted: boolean
    tracks the mounted state of the component
  delay: number
    the amount to delay the component's unmounting

*/

const useDelayUnmount = (isMounted: boolean, delay: number): boolean => {
  // is the component mounting or unmounting
  // this state is set according to the isMounted state that's passed as an arg
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // the timer that will delay the component unmount
    let timer: NodeJS.Timeout;

    // if the component is mounted, render the component as normal
    if (isMounted && !shouldRender) setShouldRender(true);
    // if the component was unmounted, unmount with the specified delay
    else if (!isMounted && shouldRender) {
      timer = setTimeout(() => setShouldRender(false), delay);
    }

    // clear the timer in the cleanup function
    return (): void => clearTimeout(timer);
  }, [isMounted, delay, shouldRender]);

  // return the shouldRender state
  return shouldRender;
};

export default useDelayUnmount;
