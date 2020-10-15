// display a dropdown menu when the icon is toggled

const menuToggle = document.querySelector('.dropdown-menu');
const linkElements = document.querySelectorAll('header ul li');
menuToggle.addEventListener('click', () => {
    linkElements.forEach((element, index) => {
        if (index !== 0) {
            if (element.className === '')  { // if the toggle is not activated
                element.className = 'activated';
                menuToggle.classList.add('activated');
            } else {
                element.className = '';
                menuToggle.classList.remove('activated');
            }
        }
    })
})