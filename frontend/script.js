const url='https://e2e-todo.onrender.com'
// const url= 'http://localhost:3000'

const headers={
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                  }
              }

async function onClickSignUp()
{
    const username= document.getElementById('signup-username').value;
    const password= document.getElementById('signup-password').value
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if( password != confirmPassword)
    {
      alert('Password dosent match ')
    }
    else{
        

        try{ 
        const response =await axios.post(url+'/user/signup',
          {username, password},
          headers   
        )
        window.location.href='login.html'
      }catch(e)
      {
        if(e.response.status == 409)
        {
          alert('Username already in use')
          window.location.href='index.html'
        }
      }
      
     
      
    }

}    


async function onClickLogin()
{
  const username = document.getElementById('login-username').value
  const password= document.getElementById('login-password').value

  try{
  const response = await axios.post(url+'/user/login',
    {username, password} ,
    headers)

    console.log(response)

    if( response.data.token)
    {
      localStorage.token=response.data.token
      window.location.href='todos.html'
    }
  
    else{
      alert('Invalid Credentials')
      window.location.href='login.html'
    }
  }catch(e)
  {
    alert('Invalid Credentials')
      window.location.href='login.html'
  }
}






