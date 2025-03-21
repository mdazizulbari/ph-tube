const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
};
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
};
const removeActiveClass = () => {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
};
const loadCategories = () => {
  //   fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //   convert promise to json
    .then((response) => response.json())
    //   send data to display
    .then((data) => displayCategories(data.categories));
};
const loadVideos = (searchText = "") => {
  // using loader
  showLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
};
const loadCategoryVideos = (id) => {
  // loader
  showLoader()
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      console.log(clickedButton);
      displayVideos(data.category);
    });
};
const loadVideoDetails = (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayVideoDetails(data.video));
};
const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  console.log(detailsContainer);
  detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
      <figure>
        <img src="${video.thumbnail}" alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div class="card-actions justify-end"></div>
      </div>
    </div>
  `;
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
      <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-red-500 hover:text-white">${category.category}</button>
    `;
    // append element
    categoryContainer.append(categoryDiv);
  }
};
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = ``;
  if (videos.length == 0) {
    videoContainer.innerHTML = `
      <div
        class="py-20 col-span-full flex flex-col justify-center items-center text-center"
      >
        <img src="images/Icon.png" alt="" class="w-[120px]" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
    `;
    // loader
    hideLoader();
    return;
  }
  videos.forEach((video) => {
    // console.log(video)
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
      <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover" src="${
            video.thumbnail
          }" alt="Shoes" />
          <span
            class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2"
            >3hrs 56 min ago</span
          >
        </figure>
        <div class="flex gap-3 px-0 py-5">
          <div class="profile">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
              >
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="text-sm font-semibold">${video.title}</h2>
            <p class="text-sm text-gray-400 flex gap-1">
                  ${video.authors[0].profile_name}
                  ${
                    video.authors[0].verified == true
                      ? `
              <img
                class="w-5 h-5"
                src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                alt=""
              />
                    `
                      : ``
                  }
            </p>
            <p class="text-sm text-gray-400 flex gap-1">${
              video.others.views
            }</p>
          </div>
        </div>
        <button onclick=loadVideoDetails("${
          video.video_id
        }") class="btn btn-block">Show Details</button>
      </div>
        `;
    videoContainer.append(videoCard);
  });
  // loader
  hideLoader();
};
document.getElementById("search-input").addEventListener("keyup", (event) => {
  const input = event.target.value;
  loadVideos(input);
});
loadCategories();
