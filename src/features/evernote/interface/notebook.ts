export interface Notebook {
    id:number,
    name:string
}

export type NotebookResponse = Notebook[] | undefined

export interface NotebookRequest {
    id?: number;
    name?: string;
  }