
import {dom} from './dom.js'
export function navigateTo(path, callback) {
  history.pushState({}, null, path);
  window.dispatchEvent(new Event('pushstate'));
  callback && callback();
}
export const makeLink = (callback) => function Link({target, to, ...props}){
  const handleClick = (e) => {
    const isMainEvent = e.button === 0; // primary click
    const isModifierEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    const isManegableEvent = !props.target || props.target === '_self';

    if (isMainEvent && isManegableEvent && !isModifierEvent) {
      e.preventDefault();
      navigateTo(to, callback);
    } 
  }
  return dom('a', {href: to, ...props, onClick: handleClick})
}