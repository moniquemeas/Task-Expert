async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-pw').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        response.redirect('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

async function signupFormHandler(event) {
    event.preventDefault();
  const username = document.querySelector('#user-signup').value;
  const email = document.querySelector('#email-signup').value;
  const password = document.querySelector('#pw-signup').value;
  
  if (username && email && password) {
    const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            username,
            email,
            password
        }),
        headers: {'Content-Type': 'application/json'}

    });
    console.log(username)
    if(response.ok){
        document.location.replace('/dashboard')
    } else { alert(response.statusText)}
   
  }

  }
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);