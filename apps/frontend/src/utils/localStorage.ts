const storage = new Map();

export default class LocalStorage {
    static setItem(key: string, value: string): void {
        storage.set(key, value);
    }
    static getItem(key: string): string | null {
        return storage.get(key) || null;
    }
    static removeItem(key: string): void {
        storage.delete(key);
    }
    static clear(): void {
        storage.clear();
    }
}
