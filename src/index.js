console.log("%c HI", "color: firebrick");
document.addEventListener("DOMContentLoaded", () => {
  fetchImage();
  fetchBreed();
});

function fetchImage() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((resp) => resp.json())
    .then((dogData) => dogData.message.forEach(rendering));
}

function rendering(dogData) {
  let image = document.createElement("img");

  image.src = dogData;

  document.querySelector("#dog-image-container").append(image);
}

function fetchBreed() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((breedData) => renderBreed(breedData));
}

function renderBreed(breeds) {
  // console.log(breeds.message)

  for (const breed in breeds.message) {
    let list = document.createElement("li");

    list.textContent = breed;

    document.querySelector("#dog-breeds").append(list);

    //
    list.addEventListener("click", () => {
      list.style.color = "red";
    });

    filterBreeds(breeds);
  }
}

function filterBreeds(breeds) {
  // console.log(breeds)
  //console.log(Object.keys(breeds.message))

  //addEventListener to the dropdown.

  document.getElementById("breed-dropdown").addEventListener("change", (event) => {
      // console.log(event.target.value)
      // clear previous breeds
      document.querySelector("#dog-breeds").innerHTML = "";

      //getting Json.messages which are just breed names

      let breedsNames = Object.keys(breeds.message);
      // console.log(event.target)
      const filtered = breedsNames.filter(
        (key) => key[0] === event.target.value
        );

      filtered.forEach((breed) => {
        let newList = document.createElement("li");
        newList.textContent = breed;
        document.querySelector("#dog-breeds").append(newList);
        newList.addEventListener("click", () => {
          newList.classList.toggle('blue')
        });
      });
    });
}
