async function addFormHandler(event) {
  event.preventDefault();
  const userImage= document.querySelector('#user-image');
const name = document.querySelector('#name-input').value.trim();
const phone = document.querySelector('#phone-input').value.trim();
const email = document.querySelector('#email-input').value.trim();
const services = document.querySelector('#service-input').value.trim();
const price = document.querySelector('#price-input').value.trim();
const location = document.querySelector('#location-input').value.trim();
const userId = document.querySelector('#user_id-input').value.trim();

const file = userImage.files[0];

const sendData = new FormData();
sendData.append('userImage', file);
sendData.append('name', name);
sendData.append('phone', phone);
sendData.append('email', email);
sendData.append('price', price);
sendData.append('services', services);
sendData.append('location', location);
sendData.append('user_id', userId);

const response = await fetch('/api/tasks', {
  method: "PUT",
  body: sendData,
})
if(response.ok){
  document.location.replace('/')
} else { alert(response.statusText)}

}

document.querySelector('.edit-job').addEventListener('submit', addFormHandler);
  