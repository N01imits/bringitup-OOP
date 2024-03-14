import { ISliderSelectors, Slider } from './slider';

export class MainSlider extends Slider {
	constructor({
		containerSelector,
		buttonsSelector,
		nextButtonSelector,
		prevButtonSelector,
	}: ISliderSelectors) {
		super({
			containerSelector,
			buttonsSelector,
			nextButtonSelector,
			prevButtonSelector,
		});
	}

	showSlides(indexCurrentSlide: number) {
		if (indexCurrentSlide > this.slides.length) {
			this.slideIndex = 1;
		}
		if (indexCurrentSlide < 1) {
			this.slideIndex = this.slides.length;
		}
		if (indexCurrentSlide === 3 && this.autoPopupImage) {
			this.autoPopupImage.classList.add('hidden');
			setTimeout(() => {
				this.autoPopupImage?.classList.remove('hidden');
				this.autoPopupImage?.classList.add('animated', 'bounceInUp');
			}, 3000);
		} else {
			this.autoPopupImage?.classList.remove('bounceInUp');
		}

		this.slides.forEach(slide => {
			slide.style.display = 'none';
		});
		if (!this.slides[this.slideIndex - 1]) {
			return;
		}
		this.slides[this.slideIndex - 1].style.display = 'block';
		this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
	}

	plusSlides(step: number) {
		this.showSlides((this.slideIndex += step));
	}

	bindTriggers() {
		this.buttons?.forEach(button => {
			button.addEventListener('click', () => {
				this.plusSlides(1);
			});

			button.parentElement?.previousElementSibling?.addEventListener('click', e => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		});

		this.nextButtons?.forEach(button => {
			button.addEventListener('click', e => {
				e.stopPropagation();
				e.preventDefault();
				this.plusSlides(1);
			});
		});

		this.prevButtons?.forEach(button => {
			button.addEventListener('click', e => {
				e.stopPropagation();
				e.preventDefault();
				this.plusSlides(-1);
			});
		});
	}

	init() {
		this.autoPopupImage = document.querySelector('.hanson');

		this.showSlides(this.slideIndex);
		this.bindTriggers();
	}
}
