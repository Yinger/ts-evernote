import {NotebookResponse} from '../interface/notebook'

export type Action = {
    type: string;
    payload: any;
  };
  
  export type State = Readonly<{
    notebooks: NotebookResponse;
  }>;