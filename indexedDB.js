let db;

const firstNameElem = document.getElementById('firstName');
const lastNameElem = document.getElementById('lastName');
const form = document.querySelector('form');
const list = document.querySelector('ul');

window.onload = () => {

    let request = window.indexedDB.open('contacts', 1);

    request.onerror = function() {
        console.log('Database failed to open.');
    }

    request.onsuccess = function() {
        console.log('Database opened successfully');

        db = request.result;

        //invoke data
        displayData();

    }

    request.onupgradeneeded = function(e) {
        let db = e.target.result;

        let objectStore = db.createObjectStore('contacts', {
            keyPath: 'id',
            autoIncrement: true
        });

        objectStore.createIndex('firstName', 'firstName', {unique: false});
        objectStore.createIndex('lastName', 'lastName', {unique: false});
        

        console.log('Database setup complete');
    }

    //inser data
    function addData(e) {
        e.preventDefault();

        let newItem = {
            firstName: firstNameElem.value,
            lastName: lastNameElem.value
        };

        let transaction = db.transaction(['contacts'], 'readwrite')
        
        let objectStore = transaction.objectStore('contacts');

        let request = objectStore.add(newItem);

        request.onsuccess = () => {
            firstNameElem.value = '';
            lastNameElem.value = '';
        };

        transaction.oncomplete = () => {
            console.log('Transaction completed on the database!');
            //invoke displayData when submiited the form successfully
            displayData();
        }

        transaction.onerror = () => {
            console.log('Transaction not completed, please check error!');
        }

    }//addData

    form.onsubmit = addData;

    //retreive data
    function displayData() {
        while(list.firstChild) {
            list.removeChild(list.firstChild);
        }

        let objectStore = db.transaction('contacts').objectStore('contacts');
        objectStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;

            if (cursor) {
                console.log('cursor:', cursor);
                console.log('cursor.value:', cursor.value);
                let listItem = document.createElement('li');
                let first = document.createElement('span');
                first.setAttribute('class', 'mr-1');
                let last = document.createElement('span');

                listItem.appendChild(first);
                listItem.appendChild(last);
                list.appendChild(listItem);

                first.textContent = cursor.value.firstName;
                last.textContent = cursor.value.lastName;

                listItem.setAttribute('data-contact-id', cursor.value.id);
                listItem.setAttribute('class', 'list-group-item list-group-item-info')

                //delete btn
                let deleteButton = document.createElement('button');
                listItem.appendChild(deleteButton);
                deleteButton.setAttribute('class', 'btn badge badge-primary badge-pill float-right');
                deleteButton.textContent = 'Delete';

                //invoke delete func
                deleteButton.onclick = deleteItem;

                cursor.continue();
            } else {
                if(!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No contacts store.';
                    list.appendChild(listItem);
                }
            }

            console.log('Contacts displayed!!!')

        }

    }//displayData

    //delete item
    function deleteItem(e) {
        let contactId = Number(e.target.parentNode.getAttribute('data-contact-id'));
        
        let transaction = db.transaction(['contacts'], 'readwrite')
        let objectStore = transaction.objectStore('contacts');
        //let request = objectStore.add(newItem);   
        let request = objectStore.delete(contactId);    

        transaction.oncomplete = () => {

            //remove item
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);


            console.log(`Contact ${contactId} is deleted`);
            //invoke displayData when submiited the form successfully

            if(!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'You deleted all contacts';
                list.appendChild(listItem);
            }    
     
        }

        
    }


}//window.onload