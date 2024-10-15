class StorageService {
    applicationStorage = JSON.parse(localStorage.getItem("applicationStorage")) ?? {
        token: null,
        isLogin: false,
        user: null
    };

    setItem(key: string, value): void {
        this.applicationStorage[key] = value;
        localStorage.setItem("applicationStorage", JSON.stringify(this.applicationStorage));
    }

    getItem(key: string) {
        return this.applicationStorage?.[key];
    }

    removeItem(key: string): void {
        this.applicationStorage[key] = null;
        localStorage.setItem("applicationStorage", JSON.stringify(this.applicationStorage));
    }

    clearStorage(): void {
        localStorage.removeItem("applicationStorage");
    }
}

export default new StorageService();
