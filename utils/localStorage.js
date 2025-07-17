export const loadState = () => {
  try {
    const serialized = localStorage.getItem("reduxState");
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("reduxState", serialized);
  } catch {}
};
