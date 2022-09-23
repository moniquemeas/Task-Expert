async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
      alert('Your task has been deleted!');
    document.location.replace('/dashboard');
    
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.delete-task').addEventListener('click', deleteFormHandler);