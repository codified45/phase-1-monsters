
let limitMonstNum = 50;
let limitMonstNumString = `/?_limit=${limitMonstNum}`;
let pageOffset = 1;
let pageOffsetString = `&_page=${pageOffset}`;
let queryString = limitMonstNumString + pageOffsetString;
let monstersUrl = `http://localhost:3000/monsters${queryString}`;
let addMonstUrl = 'http://localhost:3000/monsters';

const init = () => {
    const backArrow = document.querySelector('#back');
    const forwardArrow = document.querySelector('#forward');
    forwardArrow.addEventListener('click', forwardClick);
    backArrow.addEventListener('click', backwardClick);
    const monstContainer = document.querySelector('#monster-container');
    createForm();
    fetchMonsters();

    function fetchMonsters(){
        fetch(monstersUrl)
            .then(res => res.json())
                .then(array => {
                    for (const obj of array){
                    let div = document.createElement('div');
                    let h1 = document.createElement('h1');
                    let h2 = document.createElement('h2');
                    let p = document.createElement('p');
                    h1.textContent = obj.name;
                    h2.textContent = `Age: ${obj.age}`;
                    p.textContent = obj.description;
                    div.append(h1, h2, p);
                    monstContainer.appendChild(div);
                    }
                });
    };

    function createForm(){
        let formContainer = document.querySelector('#create-monster');
        let form = document.createElement('form');
        form.addEventListener('submit', addMonst);
        form.id = "createMonst";
        let nameInput = document.createElement('input');
        nameInput.placeholder = "name...";
        let ageInput = document.createElement('input');
        ageInput.placeholder = "age...";
        let dscrptInput = document.createElement('input');
        dscrptInput.placeholder = "description...";

        let createMonstBtn = document.createElement('button');
        createMonstBtn.type = "submit";
        createMonstBtn.textContent = "Create Monster";
        form.append(nameInput, ageInput, dscrptInput, createMonstBtn);
        formContainer.appendChild(form);
    };

    function addMonst(e){
        e.preventDefault();
        let formData = {
            name: e.target[0].value,
            age: e.target[1].value,
            description: e.target[2].value,
        };
        let postConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData),
        };

        e.target.reset();
        fetch(addMonstUrl, postConfig)
            .then(res => res.json())
                .then(obj => {
                    let div = document.createElement('div');
                    let h1 = document.createElement('h1');
                    let h2 = document.createElement('h2');
                    let p = document.createElement('p');
                    h1.textContent = obj.name;
                    h2.textContent = `Age: ${obj.age}`;
                    p.textContent = obj.description;
                    div.append(h1, h2, p);
                    monstContainer.prepend(div);
                });
    };

    function forwardClick(e){
        pageOffset = pageOffset + 1;
        monstersUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageOffset}`;
        monstContainer.replaceChildren();
        fetchMonsters();
    };

    function backwardClick(e){
        if (pageOffset > 1){
        pageOffset = pageOffset - 1;
        monstersUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageOffset}`;
        monstContainer.replaceChildren();
        fetchMonsters();
        };
    };

};

document.addEventListener('DOMContentLoaded', init);

/*
Deliverables:

1. When the page loads, show the first 50 monsters. (done)
2. Each monster's name, age, and description should be shown. (done)

3. Above your list of monsters, you should have a form to create a new monster. (done)
4. You should have fields for name, age, and description, (done)
5. and a 'Create Monster Button'. (done)
6. When you click the button, the monster should be added to the list and (done)
7. saved in the API. (done)

8. At the end of the list of monsters, show a button. (done)
9. When clicked, the button should load the next 50 monsters and show them. (done)

Extra: 
10. There is also a back button, and it only works when the page count is > 1. (done)
*/