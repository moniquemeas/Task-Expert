async function addFormHandler(event) {
    event.preventDefault();
  const name = document.querySelector('.name-input').value.trim();
  const phone = document.querySelector('.phone-input').value.trim();
  const email = document.querySelector('.email-input').value.trim();
  const services = document.querySelector('.service-input').value.trim();
  const price = document.querySelector('.price').value.trim();
  const location = document.querySelector('.location').value.trim()
  
  if (name && phone && email && services && price && location) {
    const response = await fetch('/api/tasks', {
        method: 'post',
        body: JSON.stringify({
            name,
            phone,
            email,
            services,
            price,
            location
        }),
        headers: {'Content-Type': 'application/json'}

    });
    console.log(username)
    if(response.ok){
        document.location.replace('/dashboard')
    } else { alert(response.statusText)}
   
  }

  }

  document.querySelector('.add-job').addEventListener('submit', addFormHandler);