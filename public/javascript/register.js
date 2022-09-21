async function signupFormHandler(event) {
    event.preventDefault();
  const username = document.querySelector('#user-signup').value;
  const password = document.querySelector('#pw-signup').value;
  
  if (username && password) {
    const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {'Content-Type': 'application/json'}

    });
    console.log(username)
    if(response.ok){
        
        document.location.replace('/login');
    } else { alert(response.statusText)}
   
  }

  };
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);