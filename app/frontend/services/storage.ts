type storageKey = 'user_preferences'

export default class Storage {
  setItem(key: storageKey, content: any) {
    localStorage.setItem(key, JSON.stringify(content));
  }

  getItem(key: storageKey): any {
    const content = localStorage.getItem(key);

    return content ? JSON.parse(content) : null;
  }

  removeItem(key: storageKey) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export const storageService = new Storage();
