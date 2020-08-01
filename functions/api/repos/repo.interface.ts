export interface IRepository<T>
{
    findAll(): Promise<T[]>;
    findById(id: any): Promise<T>;
    create(newItem: T): Promise<T>;
    update(itemId: any, item: T): Promise<T>;
    delete(itemId: any);
}