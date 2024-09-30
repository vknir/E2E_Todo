const url='https://e2e-todo.onrender.com'

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
        const response =await axios.post(url+'/user/signup',
          {username, password},
          headers   
        )
      console.log(response.data.message);
      console.log(window.location.href)
      window.location.href='login.html'
    }

}    


async function onClickLogin()
{
  const username = document.getElementById('login-username').value
  const password= document.getElementById('login-password').value

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

    }
}


