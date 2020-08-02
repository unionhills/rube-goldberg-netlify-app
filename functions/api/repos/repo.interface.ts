export interface IRepository<T, K>
{
    findAll(): Promise<T[]>;
    findById(id: any): Promise<T>;
    create(newItem: K): Promise<T>;
    update(itemId: any, item: K): Promise<T>;
    delete(itemId: any);
}