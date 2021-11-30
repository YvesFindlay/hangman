export const renderAlert = (setterFn) => {
  setterFn(true);

  setTimeout(() => {
    setterFn(false);
  }, 2000);
};
