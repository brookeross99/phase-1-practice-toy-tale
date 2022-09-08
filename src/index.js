let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  // makes sure the DOM is loaded
  const addBtn = document.querySelector("#new-toy-btn");
  // adds the "add a new toy" button
  const toyFormContainer = document.querySelector(".container");
  // creates an object for the toy container
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const toyCollection = document.getElementById('toy-collection')
  
  // rendering toy cards from json
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyArray => {
  
    // console.log(toyCollection)
    // console.log(toyArray)
    toyArray.forEach(renderToyCard) 
        
  
    // toy adding from form
    const form = document.getElementsByClassName("add-toy-form")[0];
    form.addEventListener('submit', e => {
      e.preventDefault()
      // console.log('hello')
      const toyName = e.target.name.value 
      const toyImage = e.target.image.value
      const newToy = {
        name: toyName,
        image: toyImage,
        likes: 0
      }
      // renderToyCard(newToy);
      postToyFunction('http://localhost:3000/toys', newToy)
      .then(renderToyCard)
      .catch(console.error());
      
      // console.log(e.target.name.value);
      // console.log(e.target.image.value);
    })
    
    // console.log(form);
  }) 
  //posting form to db.json
  
  function postToyFunction(url, toyCard){
  fetch(url, {
    method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(toyCard),
            })
            .then(res => res.json())
  }

  function updateToyLIkes(){};

// a function to create new cards, either from json or from the form
function renderToyCard(toy){
  const div = document.createElement('div');
      div.className = 'card';
      // console.log(toy);
      // console.log(div);
      
      const h2 = document.createElement('h2');
      h2.textContent = toy.name
      
      const img = document.createElement('img');
      img.src = toy.image;
      img.className = 'toy-avatar';
      
      const button = document.createElement('button');
      button.className = "like-btn";
      button.id = toy.id;
      button.textContent = 'Like ❤️';
      
      const p = document.createElement('p')   
      p.textContent = `${toy.likes} likes`;    
      // console.log(img);
      
      toyCollection.append(div);
      
      div.append(h2, img, p, button);

      button.addEventListener('click', () => {
        p.textContent = `${++toy.likes} likes`
        console.log(toy.likes)
      });
}

})