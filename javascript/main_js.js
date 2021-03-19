//main_input start_date end_date main_button submitData()
let text_field = document.querySelector('#main_input');
let start_date_field = document.querySelector('#start_date');
let end_date_field = document.querySelector('#end_date');
let main_button = document.querySelector('#main_button');
let arrayToSaved = [];

function submitData() {

    let validate = validator(); //validation
    if(validate === false){
        return;
    }
    
    //save to loalstorage
    let valueToBeDisplayed = saveToLocalStorage();

    //display on interface
    displayValues(valueToBeDisplayed);

}

function validator() {//validates our fields

    if(text_field.value === ''){
        text_field.style.borderColor = 'red';
        return false;
    }

    if(start_date_field.value === ''){
        start_date_field.style.borderColor = 'red';
        return false;
    }

    if(end_date_field.value === ''){
        end_date_field.style.borderColor = 'red';
        return false;
    }

    //make the input border normal
    text_field.style.borderColor = '';
    start_date_field.style.borderColor = '';
    end_date_field.style.borderColor = '';
    return true;

}

function saveToLocalStorage() {

    let idValue;
    let savedObject = selectFromLocalStorage('to_do_list');//select fronm localstorage
    if(savedObject === null){
        idValue = 1;
    }else{
        let lastKey = parseFloat(savedObject.length);//getting the key for the last object in the saved array
        idValue = parseFloat(lastKey) + parseFloat(1);//add one to the key
        arrayToSaved = savedObject;
    }

    //create an object for the newly created too do
    let object = {
        id:idValue,
        title:text_field.value,
        start_date:start_date_field.value,
        end_date:end_date_field.value,
        status:'not_completed',
    }

    arrayToSaved.push(object);//add the latest object to the array

    //save to localstorage
    let stringToBeSaved = JSON.stringify(arrayToSaved);
    localStorage.setItem('to_do_list', stringToBeSaved);

    //clear the fields
    text_field.value = '';
    start_date_field.value = '';
    end_date_field.value = '';
    //return the array of objects
    return arrayToSaved;
}

function selectFromLocalStorage(key) {//selects from localstorage
    let value = localStorage.getItem(key);
    if(value === null){
        return null;
    }

    if(value !== null){
        return JSON.parse(value);
    }
}

function displayValues(arrayOfObject) {

    if(typeof arrayOfObject !== 'object'){
        alert('Wrong data type');
        return;
    }
    let text = '';
    let no = 1;
    arrayOfObject = arrayOfObject.reverse();
    for(let i in arrayOfObject){

        let statusButton = arrayOfObject[i].status === 'not_completed' ? `<button type="button" onclick="updateStatus(this)" data-id="${arrayOfObject[i].id}" >Update Status</button>` : ''

        text += `<tr style="background-color: ${arrayOfObject[i].status === 'completed' ? 'blue':''}">
            <td>${no}</td>
            <td>${arrayOfObject[i].title}</td>
            <td>${arrayOfObject[i].start_date}</td>
            <td>${arrayOfObject[i].end_date}</td>
            <td>${arrayOfObject[i].status === 'completed' ? 'COMPLETED':'NOT COMPLETED'}</td>
            <td><button type="button" onclick="deleteItem(this)" data-id="${arrayOfObject[i].id}" >Delete</button></td>
            <td><button onclick="startUpdate(this)" type="button" data-id="${arrayOfObject[i].id}" >Edit</button></td>
            <td>${statusButton}</td>
        </tr>`
        no++;
    }

    //send to the dom
    document.getElementById('main_tb_body').innerHTML = text;
}

function displayOnLoad() {//display on load
    let savedObject = selectFromLocalStorage('to_do_list');//select fronm
    if(savedObject !== null){
        displayValues(savedObject);
    }
}

function updateStatus(a){
    let retVal = confirm('Do you want to mark event as completed?');
    if(retVal === true){

        let key = a.getAttribute('data-id');//get the key
        let savedObject = selectFromLocalStorage('to_do_list');//select fronm
        if(savedObject !== null){
            for (let l in savedObject){
                if(parseFloat(savedObject[l].id) == parseFloat(key)){
                    savedObject[l].status = 'completed';
                    break;
                }
            }
        }

        //save to localstorage
        let stringToBeSaved = JSON.stringify(savedObject);
        localStorage.setItem('to_do_list', stringToBeSaved);
        displayValues(savedObject);

    }
}

//show value on load
window.onload = displayOnLoad();

function deleteItem(a) {

    let retVal = confirm('Do you really want to delete It');
    if(retVal === true){
        let key = a.getAttribute('data-id');//get the key
        let savedObject = selectFromLocalStorage('to_do_list');//select fronm
        if(savedObject !== null){
            for (let l in savedObject){
                if(parseFloat(savedObject[l].id) == parseFloat(key)){
                    savedObject.splice([l], 1);//delete that particular object
                    break;
                }
            }
        }

        //save to localstorage
        let stringToBeSaved = JSON.stringify(savedObject);
        localStorage.setItem('to_do_list', stringToBeSaved);
        displayValues(savedObject);
    }

}

function startUpdate(a) {

    let retVal = confirm('Do you really want to Edit this ?');
    if(retVal === true){
        let key = a.getAttribute('data-id');//get the key
        let savedObject = selectFromLocalStorage('to_do_list');//select fronm
        if(savedObject !== null){
            for (let l in savedObject){
                if(parseFloat(savedObject[l].id) == parseFloat(key)){
                    //set the values to the different fields
                    end_date_field.value = savedObject[l].end_date;
                    start_date_field.value = savedObject[l].start_date;
                    text_field.value = savedObject[l].title;
                    break;
                }
            }
        }

        //add update function to main button
        main_button.removeAttribute('onclick');
        main_button.setAttribute('onclick', 'updateItem(this)')
        main_button.setAttribute('data-id', key);
        main_button.innerText = 'Update'
    }

}

function updateItem(a) {

    let retVal = confirm('Do you really want to update?');

    if(retVal === true){
        let key = a.getAttribute('data-id');//get the key
        let savedObject = selectFromLocalStorage('to_do_list');//select fronm
        if(savedObject !== null){
            for (let l in savedObject){
                if(parseFloat(savedObject[l].id) == parseFloat(key)){

                    //set values of each item in the selected object to the corresponding item from the form
                    savedObject[l].end_date = end_date_field.value;
                    savedObject[l].start_date = start_date_field.value;
                    savedObject[l].title = text_field.value;
                    break;

                }
            }
        }

        //save to localstorage
        let stringToBeSaved = JSON.stringify(savedObject);
        localStorage.setItem('to_do_list', stringToBeSaved);
        displayValues(savedObject);//rebuild the interface
        reverseToDefault()
    }

    if(retVal === false){

        reverseToDefault()

    }

}

function reverseToDefault() {
    //add update function to main button
    main_button.removeAttribute('data-id');
    main_button.removeAttribute('onclick');
    main_button.setAttribute('onclick', 'submitData()')
    main_button.innerText = 'Submit'
    //clear the fields
    text_field.value = '';
    start_date_field.value = '';
    end_date_field.value = '';
}