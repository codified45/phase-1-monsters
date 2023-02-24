
let limitMonstNum = 50;
let limitMonstNumString = `/?_limit=${limitMonstNum}`;
let pageOffset = 1;
let pageOffsetString = `&_page=${pageOffset}`;
let queryString = limitMonstNumString + pageOffsetString; 
console.log(queryString);
let monstersUrl = `http://localhost:3000/monsters${queryString}`;

const init = () => {
    const backArrow = document.querySelector('#back');
    const forwardArrow = document.querySelector('#forward');
    forwardArrow.addEventListener('click', forwardClick);
    backArrow.addEventListener('click', backwardClick);
    fetchMonsters();

};

function fetchMonsters(){
    fetch(monstersUrl)
        .then(res => res.json())
            .then(array => {
                for (const obj of array){
                console.log(obj.name);
                let li = document.createElement('li');
                
                // let
                }
            });
};

function forwardClick(e){
    // e.
    pageOffset = pageOffset + 1;
    monstersUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageOffset}`;
    fetchMonsters();
};

function backwardClick(e){
    // e.
    if (pageOffset > 1){
    pageOffset = pageOffset - 1;
    monstersUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageOffset}`;
    fetchMonsters();
    };
};

document.addEventListener('DOMContentLoaded', init);
/*

Deliverables:

1. When the page loads, show the first 50 monsters. 
2. Each monster's name, age, and description should be shown.

3. Above your list of monsters, you should have a form to create a new monster. 
4. You should have fields for name, age, and description, 
5. and a 'Create Monster Button'. 
6. When you click the button, the monster should be added to the list and 
7. saved in the API.

8. At the end of the list of monsters, show a button. 
9. When clicked, the button should load the next 50 monsters and show them.

*/