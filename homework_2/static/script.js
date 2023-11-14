class SlideHandler {
    #slidesContainer;
    #slides;
    #currentSlideNumber = 0;

    constructor(slidesContainer) {
        this.#slidesContainer = slidesContainer;
        this.#slides = Array.from(slidesContainer.querySelectorAll('.slide'));
        this.#create();
        this.setActiveSlide(this.#currentSlideNumber);
    }

    #create() {
        const togglesContainer = document.createElement('div');
        const fullSizeContainer = document.querySelector('.full-size__container');
        togglesContainer.classList.add('toggle-container');
        for (let i = 0; i < this.#slides.length; i++) {
            togglesContainer.innerHTML += `<div data-id="${i}" class="toggle"></div>`
        }
        this.#slidesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle')) {
                this.setActiveSlide(e.target.dataset.id);
            }else if(e.target.classList.contains('slide')){
                const slide = this.#slides[this.#currentSlideNumber];
                fullSizeContainer.classList.add('full-size__container_display');
                const img = fullSizeContainer.querySelector('.full-size__img');
                img.src=slide.src;
                img.alt=slide.alt;
            }
        });
        fullSizeContainer.addEventListener('click',()=>{
            fullSizeContainer.classList.remove('full-size__container_display');
        });
        this.#slidesContainer.appendChild(togglesContainer);
    }

    setActiveSlide(currentSlideNum) {
        this.#currentSlideNumber = currentSlideNum;
        document.querySelector('.slide_active')?.classList.remove('slide_active');
        document.querySelector('.toggle_active')?.classList.remove('toggle_active');

        this.#slides[currentSlideNum].classList.add('slide_active');
        document.querySelector(`[data-id="${currentSlideNum}"]`).classList.add('toggle_active');
    }

    next() {
        if (this.#currentSlideNumber === this.#slides.length - 1) {
            this.#currentSlideNumber = 0;
        } else {
            this.#currentSlideNumber++;
        }
        this.setActiveSlide(this.#currentSlideNumber);
    }

    prev() {
        if (this.#currentSlideNumber === 0) {
            this.#currentSlideNumber = this.#slides.length - 1;
        } else {
            this.#currentSlideNumber--;
        }
        this.setActiveSlide(this.#currentSlideNumber);
    }
}

const slideContainer = document.querySelector('.slide-container');
sliderHandler = new SlideHandler(slideContainer);

document.querySelector('.arrow-button_prev').addEventListener('click', sliderHandler.prev.bind(sliderHandler));
document.querySelector('.arrow-button_next').addEventListener('click', sliderHandler.next.bind(sliderHandler));