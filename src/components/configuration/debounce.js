export const debounce  = (fn, delay,apiURL)  =>  {
  let timer;
  return (...args) => {
    const context = this;

    clearTimeout(timer);

    timer = setTimeout(() =>  {
      fn.apply(context, args);
    }, delay);
  }
}
