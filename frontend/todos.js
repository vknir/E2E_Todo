const url='http://localhost:3000'

const headers={
    headers: {
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
        const list= response.data.result

        const unorderedDisplay= document.getElementById('display')
        for(let i=0;i<list.length;i++)
        {
            const li= document.createElement('li');

            const textnode = document.createTextNode(list[i].todos);
            li.appendChild(textnode)

            const button = document.createElement('button')
            button.addEventListener('click', ()=> onClickDelete(list[i]._id))

            li.appendChild(button)
            
            unorderedDisplay.appendChild(li)
        }

        

    })
}

main()


async function onClickDelete(_id) {
    console.log('delete '+_id);
}