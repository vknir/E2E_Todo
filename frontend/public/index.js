const url='http://localhost:3000'

async function onClickSignUp()
{
    const username= document.getElementById('signup-username').value;
    const password= document.getElementById('signup-password').value
    
   axios.post(url+'/user/signup',{username, password},{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
    ).then((response)=>{
      console.log(response)
    })
   
}