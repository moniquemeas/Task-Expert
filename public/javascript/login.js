
async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-pw').value.trim();
  
  if (username && password) {
   
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response)
    if (response.ok) {
   
      document.location.replace('/dashboard');
      
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);
 