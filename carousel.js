// this script creates an image slider to show the top 5 popular movies


const recommendButton = document.querySelector('.main-button');

// create carousel when the recommendation button is clicked
recomButtton.addEventListener('click',  () => {
    // initialize DOM elements that the functions work with
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const carouselDiv = document.querySelector('.carousel');

    nextButton.style.display = 'inline-block'; // show arrow buttons that are hidden
    prevButton.style.display = 'inline-block'; // show arrow buttons that are hidden
    carouselDiv.style.height = '600px'; // set a proper height for the carousel div

    const slideWidth = slides[0].getBoundingClientRect().width;


    // arrange the slides next to each other
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    })

    //remove recomendation button
    recommendButton.remove();

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }
    // when i click left, move slides to the left
    prevButton.addEventListener('click', (e) => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
    
        moveToSlide(track, currentSlide, prevSlide)
    })
    // when i click right, move slides to the right
    nextButton.addEventListener('click', (e) => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    })

})


