const loadCategories = () => {
  //   fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //   convert promise to json
    .then((response) => response.json())
    //   send data to display
    .then((data) => displayCategories(data.categories));
};
const displayCategories = (categories) => {
  // get the container
  const categoryContainer = document.getElementById("category-container");
  // loop operation on array of object
  for (let category of categories) {
    console.log(category);
    // create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `

      <button class="btn btn-sm hover:bg-red-500 hover:text-white">${category.category}</button>
    `;
    // append element
    categoryContainer.append(categoryDiv);
  }
};
loadCategories();
