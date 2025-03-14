const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then((response) => response.json())
  .then((data)=> displayCategories(data.categories)) 
};
const displayCategories = (categories)=> {
    console.log(categories)
}
loadCategories()
