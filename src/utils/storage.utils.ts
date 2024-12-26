export class StorageUtils {
    public static getItem(key: string): string | null {
        const item = localStorage.getItem(key);

        return item && item !== 'undefined' ? JSON.parse(item) : null;
    }

    public static setItem(key: string, value: any): void {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    }

    public static removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public static clear(): void {
        localStorage.clear();
    }

    public static hasItem(key: string): boolean {
        return !!StorageUtils.getItem(key);
    }
}
