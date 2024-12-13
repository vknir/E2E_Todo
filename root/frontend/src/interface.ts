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