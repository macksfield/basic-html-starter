const carousel = document.getElementById("carousel");
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let imageEls = [];
let activeIndex = 0;

fetch("https://www.reddit.com/r/aww/top/.json?t=all")
  .then((response) => response.json())
  .then((data) => {
    let images = "";
    data.data.children.forEach((item, index) => {
      if (index === 0)
        images += `<img class="active" src="${item.data.thumbnail}"/>`;
      else images += `<img src="${item.data.thumbnail}"/>`;
    });
    addImages(images);
  });

function addImages(images) {
  carousel.innerHTML = images;

  imageEls = carousel.children;
  // console.log(imagesEls);
}

function addClickListeners() {
  prev.addEventListener('click', event => {
    prevImage();
  });
  next.addEventListener('click', event => {
    nextImage();
  });
}

function prevImage() {
  imageEls[activeIndex].classList.remove('active');
  if(activeIndex === 0) activeIndex = imageEls.length - 1;
  else activeIndex--;
  imageEls[activeIndex].classList.add('active');
  clearInterval(interval);
  interval = setInterval(() =>  nextImage(), 3000);
}

function nextImage() {
  imageEls[activeIndex].classList.remove('active');
  if(activeIndex === 24) activeIndex = 0;
  else activeIndex++;
  imageEls[activeIndex].classList.add('active');
  clearInterval(interval);
  interval = setInterval(() =>  nextImage(), 3000);
}

addClickListeners();
let interval = setInterval(() =>  nextImage(), 3000);