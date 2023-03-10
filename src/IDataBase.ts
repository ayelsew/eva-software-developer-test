export interface Collections {
  [key: string]: any
}

export declare interface Filter<D> {
  [key: string]: any;
  $and?: Filter<D>[];
  $nor?: Filter<D>[];
  $or?: Filter<D>[];
  $text?: {
      $search: string;
      $language?: string;
      $caseSensitive?: boolean;
      $diacriticSensitive?: boolean;
  };
  $where?: string | ((this: D) => boolean);
}

export interface UseCollectionReturn<D extends any> {
  create(data: D): Promise<boolean>
  read(query: Filter<D>): Promise<D[]>
  update(query: Filter<D>, data: D): Promise<number>
  delete(query: Filter<D>): Promise<number>
}

export default interface IDataBaseNoSQL<C extends Collections> {
  connect(): Promise<void>
  setDBName(name: string): void
  close(): Promise<void>;
  useCollection<K extends keyof C>(name: K): UseCollectionReturn<C[K]>
}