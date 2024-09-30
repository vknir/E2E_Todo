


const url='https://e2e-todo.onrender.com'

const headers=
        { 
                headers: 
                {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
        }




async function main()
{
        document.addEventListener('DOMContentLoaded', async()=>{
        const response = await axios.get(url+'/user',{
            headers:{
                token:localStorage.getItem('token')
            }
        })

        const h1= document.getElementById('todo-heading')
        h1.innerText='Hello '+response.data.username

        const list= response.data.result

        const unorderedDisplay= document.getElementById('display')
        for(let i=0;i<list.length;i++)
        {
            const li= document.createElement('li');

            const div = document.createElement('div');

            const textnode = document.createTextNode(list[i].todos);
            div.appendChild(textnode)

            const button = document.createElement('button')
            button.innerHTML='X'
            button.setAttribute('class', 'curvy-border  ')
            button.addEventListener('click', ()=> onClickDelete(list[i]._id))

            div.appendChild(button)
            
            li.appendChild(div);

            unorderedDisplay.appendChild(li)
        }

        

    })
}

main()


async function onClickDelete(_id) {
    
    
     await axios.delete(url+'/user/delete/'+_id,{
        headers:{
            token:localStorage.getItem('token')
        }
   })

   window.location.reload()
}

async function onClickAddTodo()
{
    const todos=document.getElementById('todo-input').value
    
    const response = await axios.post(url+'/user/add',
    {
        todos:todos    
    },{ headers:{
        token:localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
    }})

    window.location.reload()
}