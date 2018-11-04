
localStorage.setItem('name', 'Baymax');

localStorage.setItem('name2', 'Hero');
//delete item
//localStorage.removeItem('name2');

const name = localStorage.getItem('name');

const h1 = document.querySelector('#title');

name ? h1.textContent = `Welcome ${name}` : h1.textContent = 'No body but me!';

//######### 

//# form 
const input = document.querySelector('#yourname');
const form = document.querySelector('form');
const submit = document.querySelector('#submit');
const remove = document.querySelector('#remove');

//events
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

submit.addEventListener('click', () => {
    sessionStorage.setItem('yourname', input.value);
    const yourname = sessionStorage.getItem('yourname');
    const sessionName = document.getElementById('session-name');
    yourname ? sessionName.textContent = `Hey there ${yourname}` : sessionName.textContent = 'No session Yo yo!';

});

remove.addEventListener('click', () => {
    sessionStorage.removeItem('yourname');
    const sessionName = document.getElementById('session-name');
    sessionName.textContent = 'You removed it Yo.';
});

const yourname = sessionStorage.getItem('yourname');

//# end form