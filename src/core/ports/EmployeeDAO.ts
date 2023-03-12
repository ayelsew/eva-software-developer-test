import { Filter } from "./DataBaseNoSQL";


export default interface DatabaseDAO<E extends Record<string, any>> {
    insert: (data: E) => Promise<string[]>;
    find(filter: Filter<E>, deleted?: boolean): Promise<E[]>;
    update: (filter: Filter<E>, data: Partial<E>) => Promise<number>;
    remove: (filter: Filter<E>) => Promise<number>;
    parseObjectId(value: string): any
}