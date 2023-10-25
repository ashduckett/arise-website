function Slider(options) {
    this.noOfSlides = null;
    this.slider = null;
    this.originalNoOfSlidesToShow = 3;
    this.noOfSlidesToShow = 3;
    this.slides = [];
    this.prevButton = null;
    this.nextButton = null;
    this.firstSlideToShow = 0;
    this.container = null;
    this.options = options ? options : null;
    this.shiftCount = 1;
    this.shouldAutoSlide = true;
};

Slider.prototype.events = function() {

    this.prevButton.addEventListener('click', e => {
        e.preventDefault();
        this.prev();
    });

    this.nextButton.addEventListener('click', e => {
        e.preventDefault();
        this.next();
    });

    this.slider.parentElement.addEventListener('mouseover', (e) => {
        e.preventDefault();
        this.shouldAutoSlide = false;
    });

    this.slider.parentElement.addEventListener('mouseout', (e) => {
        e.preventDefault();
        this.shouldAutoSlide = true;
    });


    window.addEventListener('resize', e => {
        this.setNoOfSlidesBasedOnScreenWidth();
    });

    window.addEventListener('DOMContentLoaded', () => {
       this.setNoOfSlidesBasedOnScreenWidth();
    });

};

Slider.prototype.setNoOfSlidesBasedOnScreenWidth = function() {
    // Get hold of the current screen width
    const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        
    // If responsive options were passed in...
    if (this.options.responsive) {
        const queryToUse = this.options.responsive.filter(query => width <= query.queryWidth)[0];
        let noOfSlides = queryToUse ? queryToUse.noOfSlidesToShow : null;


        // If noOfSlides was actually set and this.noOfSlidesToShow is different to the noOfSlides, then set noOfSlides.
        if (noOfSlides !== null && noOfSlides !== this.noOfSlidesToShow) {
            this.noOfSlidesToShow = noOfSlides;
            this.render(this.slider);
        } else {
            // If noOfSlides was not set and noOfSlidesToShow isn't currently set to the originalNoOfSlidesToShow then set it.
            if (noOfSlides == null && this.originalNoOfSlidesToShow !== this.noOfSlidesToShow) {
                this.noOfSlidesToShow = this.originalNoOfSlidesToShow;
                this.render(this.slider);
            }
        }
    } 
}

Slider.prototype.prev = function() {
    
    this.slider.classList.add('slider-container-transition');

    
    this.slider.style.transform = 'translateX(0)';

    this.slider.ontransitionend = () => {
        
        this.slider.classList.remove('slider-container-transition');
            
        // Shift the slider back
        const minusValueToShiftBack = -((100 / this.noOfSlidesToShow) * this.shiftCount) + '%';
        this.slider.style.transform = 'translateX(' + minusValueToShiftBack + ')';

        // So now we have a value that is between 0 and 3. So.
        const slidesCopy = [...this.slides];
        
        for (let i = 0; i < this.shiftCount; i++) {
            this.slides[i] = slidesCopy[this.slides.length - (this.shiftCount - i)];
            this.slides[i].style.order = i + 1;
        }
        
        for (let i = this.shiftCount; i < this.slides.length; i++) {
            this.slides[i] = slidesCopy[i - this.shiftCount];
            this.slides[i].style.order = i + 1;
        }
    
        this.firstSlideToShow -= this.noOfSlidesToShow;
    };
};

Slider.prototype.next = function() {

    this.slider.classList.add('slider-container-transition');


    const minusValueToShiftBack = -((100 / this.noOfSlidesToShow) * this.shiftCount);

    this.slider.style.transform = 'translateX(' + minusValueToShiftBack * 2 + '%)';


    this.slider.ontransitionend = () => {
        
        this.slider.classList.remove('slider-container-transition');
            
        // Shift the slider back
        
        this.slider.style.transform = 'translateX(' + minusValueToShiftBack + '%)';

        const slidesCopy = [...this.slides];

        


        
        for (let i = 0; i < this.shiftCount; i++) {
            this.slides[this.slides.length - (this.shiftCount - i)] = slidesCopy[i];
            this.slides[this.slides.length - (this.shiftCount - i)].style.order = this.slides.length - i;
        }

        for (let i = 0; i < this.slides.length - this.shiftCount; i++) {
            this.slides[i] = slidesCopy[i + this.shiftCount];
            this.slides[i].style.order = i + 1;
        }

        // Increment firstSlideToShow
        this.firstSlideToShow += this.noOfSlidesToShow;
    };
};

Slider.prototype.render = function(el) {
    this.slides = Array.from(el.querySelectorAll('.slide'));
    this.noOfSlides = this.slides.length;
    el.innerHTML = '';
    this.slider = el;

    for (let i = 0; i < this.slides.length; i++) {
        const width = `${100 / this.noOfSlidesToShow}%`;
        this.slides[i].style.width = width;
    }
    
    let slidesCopy = [...this.slides];
    slidesCopy = this.slides.slice(this.firstSlideToShow).concat(this.slides.slice(0, this.firstSlideToShow));

    
    // Here we are reordering the slides so that there are the same number to the left of the offscreen area as there are being displayed.
    // I should be able to change this to just be 1
    // This part can easily be changed.
    for (let i = 0; i < this.shiftCount; i++) {
        this.slides[i] = slidesCopy[this.slides.length - (this.shiftCount - i)];
        this.slides[i].style.order = i + 1;
    }

    // Here we are arranging the one showing and the others to have an order
    for (let i = this.shiftCount; i < this.slides.length; i++) {
        this.slides[i] = slidesCopy[i - this.shiftCount];
        this.slides[i].style.order = i + 1;
    }

    for (let i = 0; i < this.slides.length; i++) {
        el.appendChild(this.slides[i]);
    }

    if (this.slider.parentElement.querySelector('.prev-button') == null) {

        // const container = document.querySelector('.slider-container');
        const container = this.slider.parentElement;
        this.prevButton = document.createElement('a');
        this.prevButton.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
        this.prevButton.href = '#';
        this.prevButton.classList.add('prev-button');

        container.appendChild(this.prevButton)

        this.nextButton = document.createElement('a');
        this.nextButton.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
        this.nextButton.href = '#';
        this.nextButton.classList.add('next-button');

        container.appendChild(this.nextButton)
        this.events();

        setInterval(() => {
            
            if (this.shouldAutoSlide) 
                this.next();
        }, 5000);

    }

    const minusValueToShiftBack = -(100 / this.noOfSlidesToShow) * this.shiftCount + '%';
    document.querySelector('.slider').style.transform = 'translateX(' + minusValueToShiftBack + ')';




};

export default Slider;