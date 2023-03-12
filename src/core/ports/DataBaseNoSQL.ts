export interface Collections {
  [key: string]: any
}

export type Filter<D extends Collections> = { [K in keyof D]?: D[K] } & {
  [name: string]: any
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

export interface UseCollectionReturn<D extends { [name: string]: any }> {
  create(data: D[]): Promise<string[]>
  read(query: Filter<D>): Promise<D[]>
  update(query: Filter<D>, data: Partial<D>): Promise<number>
  delete(query: Filter<D>): Promise<number>
}


interface DataBaseNoSQL<C extends Collections> {
  connect(): Promise<void>
  setDBName(name: string): void
  close(): Promise<void>;
  useCollection(name: string): UseCollectionReturn<C>
  parseObjectId(value: string): any
}

export default DataBaseNoSQL
