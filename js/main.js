import Slider from './slider.js';
document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider({
        responsive: [
            {
                queryWidth: 1024,
                noOfSlidesToShow: 1
            },
            {
                queryWidth: 1500,
                noOfSlidesToShow: 2
            },
  
        
        
        ]
    });
    slider.render(document.querySelector('.slider'));

    const reviewsSlider = new Slider({
        responsive: [
            {
                queryWidth: 1024,
                noOfSlidesToShow: 1
            },
            {
                queryWidth: 1500,
                noOfSlidesToShow: 2
            },
       
        
        
        ]
    });
    reviewsSlider.render(document.querySelector('.reviews-slider'));
















    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');

        if (window.scrollY > 0) {
            nav.classList.add('nav__scrolled');
        } else {
            nav.classList.remove('nav__scrolled');
        }
    });
    const nav = document.querySelector('.nav');
    
    
    nav.classList.add('notransition');
    
    if (window.scrollY > 0) {
        nav.classList.add('nav__scrolled');
    } else {
        nav.classList.remove('nav__scrolled');
    }
    nav.offsetHeight;
    nav.classList.remove('notransition');

    const navBarHeight = 82.5;


    function scrollToElement(selector, offset){
        var element = document.querySelector(selector);
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.scrollY - offset;
      
        window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
        });
    }



    // document.querySelector('.quote-link').addEventListener('click', e => {
    //     e.preventDefault();
    //     scrollToElement('.contact', 82.5);
        
    // });

    // document.querySelector('.portfolio-link').addEventListener('click', e => {
    //     e.preventDefault();
    //     scrollToElement('.portfolio', 82.5);
    // });

    // document.querySelector('.services-link').addEventListener('click', e => {
    //     e.preventDefault();
    //     scrollToElement('.pricing', 82.5);
    // });

    // document.querySelector('.home-link').addEventListener('click', e => {
    //     e.preventDefault();

    //     window.scroll({
    //         top: 0, 
    //         left: 0, 
    //         behavior: 'smooth'
    //       });
    // });



    
    // Click event for submit button
        const submitButton = document.querySelector('.submit');
        
        submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            console.log('clicked')

            const name = document.querySelector('.name').value;
            const email = document.querySelector('.email').value;
            const enquiry = document.querySelector('.enquiry').value;

            let fd = new FormData();
            fd.append('name', name);
            fd.append('email', email);
            fd.append('enquiry', enquiry);
            // fd.append('action', 'send_contact_email');

            const urlBase = window.location.origin;

            if (name && email && enquiry) {
                evt.target.innerHTML = 'Submit <i class="fas fa-spinner fa-pulse"></i>';
                fetch(urlBase + '/sendEmail.php', {
                    method: 'POST',
                    body: fd
                }).then((r) => {
                    evt.target.innerHTML = 'Submit';
                    const thanks = document.querySelector('.thank-you');
                    thanks.style.opacity = 1;

                    setTimeout(() => {
                        thanks.style.opacity = 0;
                        document.querySelector('.name').value = '';
                        document.querySelector('.email').value = '';
                        document.querySelector('.enquiry').value = '';

                    }, 5000);
                });
            }
        });


        // Hamburger
        const relatedLocations = ['.header', '.slider-container', '.portfolio', '.pricing', '.contact'];
        // Get all of the mobile options
        const mobileOptions = document.querySelectorAll('.nav__mobileMenuItem a');

        for (let i = 0; i < mobileOptions.length; i++) {
            const mOption = mobileOptions[i];
            mOption.addEventListener('click', (evt) => {
                evt.preventDefault();
            
                // Now we just need to know which one was clicked.
                document.querySelector('.hamburger').classList.toggle('isActive');
                document.querySelector('.hamburger__altMenuContainer').classList.toggle('hamburger__altMenuContainer--show');
                document.querySelector('.altMenuItems').classList.toggle('altMenuItems--shown');
                
                let offset = 100;

                if (document.body.clientWidth > 1024) {
                    offset = 100;
                } else if (document.body.clientWidth > 600) {
                    offset = 65;
                } else {
                    offset = 50;
                }




                const element = document.querySelector(relatedLocations[i]);
                const y = element.getBoundingClientRect().top + window.scrollY + -offset;
                window.scrollTo({top: y, behavior: 'smooth'});
            });
        }

        // Now the same for the non-mobile bits
        const desktopOptions = document.querySelectorAll('.nav__menu-item-link:not(.blog)');

        for (let i = 0; i < desktopOptions.length; i++) {

            const mOption = desktopOptions[i];
            
            mOption.addEventListener('click', (evt) => {
                evt.preventDefault();
            
                history.pushState("", document.title, window.location.pathname + window.location.search);
                document.querySelector(relatedLocations[i]).scrollIntoView();

                let offset = 100;

                if (document.body.clientWidth > 1024) {
                    offset = 100;
                } else if (document.body.clientWidth > 600) {
                    offset = 65;
                } else {
                    offset = 50;
                }



                const element = document.querySelector(relatedLocations[i]);

                const y = element.getBoundingClientRect().top + window.scrollY + -offset;
                window.scrollTo({top: y, behavior: 'smooth'});
            });
        }

        document.querySelector('.learn-more').addEventListener('click', () => {
            const intro = document.querySelector('.intro');
            const y = intro.getBoundingClientRect().top + window.scrollY + -100;
            window.scrollTo({top: y, behavior: 'smooth'});
        });


        const requestQuoteButtons = document.querySelectorAll('.get-quote');
        requestQuoteButtons.forEach((btn) => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                const element = document.querySelector('.contact');
                const y = element.getBoundingClientRect().top + window.scrollY + -100;
                window.scrollTo({top: y, behavior: 'smooth'});
            });
        });


    // If we should be seeing the hamburger and not the menu items...
    // if (/*window.scrollY > 0 || */document.body.clientWidth < 1145) {
    //     const menuItems = document.querySelectorAll('.nav__menu-item');

    //     menuItems.forEach((menuItem) => {
    //         menuItem.classList.add('nav__menu-item--hidden');
    //         menuItem.classList.remove('nav__menu-item--show');
    //     });

    //     document.querySelector('.hamburger').classList.add('notransition');
    //     document.querySelector('.hamburger').classList.add('hamburger--visible');
    //     document.querySelector('.hamburger').offsetHeight;

    //     document.querySelector('.nav__menu').classList.add('notransition');
    //     document.querySelector('.nav__menu').classList.add('nav__menu--hidden');
    //     document.querySelector('.nav__menu').offsetHeight;
    //     document.querySelector('.nav__menu').classList.remove('notransition');
    //     document.querySelector('.hamburger').classList.remove('notransition');


    // }

    
    const menuItems = document.querySelectorAll('.nav__menu-item');
    const menuItemLinks = document.querySelectorAll('.nav__menu-item-link');
    // After loading the first time, give back animation abilities. There must be a better way.
    setTimeout(() => {
        menuItems.forEach((menuItem) => {
            menuItem.classList.remove('noanimation');
        });
        menuItemLinks.forEach((menuItem) => {
            menuItem.classList.remove('noanimation');
        });


    }, 200); 
    

    function checkAndUpdateHamburgerMenu() {
        // // If we have scrolled at all or are over 800px wide then hide the menu options
        // // and show the hamburger
        const menuItems = document.querySelectorAll('.nav__menu-item');
        if (/* window.scrollY === 0 && */ document.body.clientWidth > 1145) {
            menuItems.forEach((menuItem) => {
                menuItem.classList.remove('nav__menu-item--hidden');
                menuItem.classList.add('nav__menu-item--show');
            });
            document.querySelector('.hamburger').classList.remove('hamburger--visible');
            document.querySelector('.nav__menu').classList.remove('nav__menu--hidden');
        } else {
            menuItems.forEach((menuItem) => {
                menuItem.classList.add('nav__menu-item--hidden');
                menuItem.classList.remove('nav__menu-item--show');
            });
            document.querySelector('.hamburger').classList.add('hamburger--visible');
            document.querySelector('.nav__menu').classList.remove('nav__menu--hidden');
        }
    }

    // window.addEventListener('scroll', checkAndUpdateHamburgerMenu);
    // window.addEventListener('resize', checkAndUpdateHamburgerMenu);


    // });

    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.hamburger').classList.toggle('isActive');
        document.querySelector('.hamburger__altMenuContainer').classList.toggle('hamburger__altMenuContainer--show');
        document.querySelector('.altMenuItems').classList.toggle('altMenuItems--shown');
    });


});