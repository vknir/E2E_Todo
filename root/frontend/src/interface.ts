export interface Token {
    token?:string,
}

export interface Props {
  type: string;
  extraInput?: boolean;
}


export interface Todos{
  id:number,
  todo:string,
  userId:number
}

export interface TodosResponse{
  data: Todos[],
  message:string
}

export interface TodoContent{
  content:string,
  index:number,
  id:number
}

export interface TodoResponse{
  message:'string',
  response:{id:number, userId:number}
}
  