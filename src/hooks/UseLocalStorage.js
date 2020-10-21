
export function getLocalStorage (key, initialValue ) {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
}

export function setLocalStorage(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
}
