class StorageContainer<T> {
    private contents: T[]

    constructor() {
        this.contents = []
    }

    getAllItems(): T[] {
        return this.contents
    }

    getItem(index: number): T | undefined {
        return this.contents[index]
    }

    addItem(item: T): void {
        this.contents.push(item)
    }

    removeItem(itemIndex: number): void {
        this.contents.splice(itemIndex, 1)
    }

    findItem(predicate: (item: T) => boolean): T | undefined {
        return this.contents.find(predicate)
    }
}
