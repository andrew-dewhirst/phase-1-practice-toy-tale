let addToy = false;
const toyData = 'http://localhost:3000/toys';
const arrayOfToys = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch(toyData)
  .then(response => response.json())
  .then(listOfToys => {
    let arrayOfToys = [...listOfToys];
    displayToys(arrayOfToys); 
   
    let buttonArray = Array.from(document.querySelectorAll('.like-btn'));
    buttonArray.forEach(button => {
      button.addEventListener('click',(event) => {
      let buttonId = event.target.id
      let currentCount = parseInt(event.target.previousSibling.innerText)
      currentCount++;
      arrayOfToys[buttonId -1].likes = currentCount
      let buttonElement = document.getElementById(buttonId);
      let p = buttonElement.previousElementSibling;
      
      p.textContent = currentCount + ' likes'
      updateLikes(buttonId);
      })
    });
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
    // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    });
    const newToyBtn = document.querySelector('.add-toy-form');
    newToyBtn.addEventListener('submit',(event) => {
    // Want to add toy to DOM and auto-reload, so turning preventDefault off
    // event.preventDefault();
      let newToyObject = {
        name: document.querySelector('.input-text').value,
        image: document.querySelector('#input-toy-URL').value,
        likes: 0
      }
    addNewToy(newToyObject);
   });
  });
});

function displayToys(arrayOfToys){
    arrayOfToys.forEach(toy => {
    let toyCard = document.createElement('div');
    toyCard.setAttribute('class', 'card');

    let h2 = document.createElement('h2');
    h2.textContent = toy.name;
    toyCard.appendChild(h2);

    let img = document.createElement('img');
    img.src = toy.image;
    img.classList = 'toy-avatar'
    toyCard.appendChild(img);

    let p = document.createElement('p');
    p.textContent = `${toy.likes} likes`;
    toyCard.appendChild(p);

    let button = document.createElement('button');
    button.textContent = 'Like';
    button.className = 'like-btn';
    button.id = toy.id
    toyCard.appendChild(button);

    document.querySelector('#toy-collection').appendChild(toyCard)
  })
};

function addNewToy(newToyObject){
  fetch(toyData,{
    method: 'POST',
    headers: 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newToyObject)
  })
};

function updateLikes(buttonId){
  let buttonElement = document.getElementById(buttonId);
  let p = buttonElement.previousElementSibling;
  let pText = p.textContent
  let likesTotal = pText.split(" ", 1);
  fetch(`http://localhost:3000/toys/${buttonId}`,{
      method: 'PATCH',
      headers: 
      {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(
        {
          likes: likesTotal[0]
        })
      })
    };
