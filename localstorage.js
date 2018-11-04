
localStorage.setItem('name', 'Baymax');

localStorage.setItem('name2', 'Hero');
//delete item
//localStorage.removeItem('name2');

const name = localStorage.getItem('name');

const h1 = document.querySelector('#title');

name ? h1.textContent = `Welcome ${name}` : h1.textContent = 'No body but me!';
