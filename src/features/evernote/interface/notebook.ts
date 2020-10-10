export interface Notebook {
  id: number;
  name: string;
}

export type NotebooksResponse = Notebook[] | undefined;

export interface NotebooksRequest {
  id?: number;
  name?: string;
}
