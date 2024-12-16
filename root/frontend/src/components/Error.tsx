
interface Props{
    type:string
}

export default function Error({type}:Props){

    
    return <p className="text-center text-red-500">{type}</p>
}