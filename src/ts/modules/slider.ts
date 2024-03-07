interface ISliderSelectors {
	pageSelector: string;
	buttonsSelector: string;
}

export class Slider {
	page: HTMLDivElement | null;
	slides: NodeListOf<HTMLDivElement>;
	buttons: NodeListOf<HTMLButtonElement>;
	slideIndex: number;
	hanson: HTMLElement | null = null;

	constructor({ pageSelector, buttonsSelector }: ISliderSelectors) {
		this.page = document.querySelector(pageSelector);
		if (!this.page) throw new Error('Страница не найдена');
		this.slides = this.page.querySelectorAll(':scope > div');
		this.buttons = document.querySelectorAll(buttonsSelector);
		this.slideIndex = 1;
	}

	showSlides(indexCurrentSlide: number) {
		if (indexCurrentSlide > this.slides.length) {
			this.slideIndex = 1;
		}
		if (indexCurrentSlide < 1) {
			this.slideIndex = this.slides.length;
		}
		if (indexCurrentSlide === 3 && this.hanson) {
			this.hanson.classList.add('hidden');
			setTimeout(() => {
				this.hanson?.classList.remove('hidden');
				this.hanson?.classList.add('animated', 'bounceInUp');
			}, 3000);
		} else {
			this.hanson?.classList.remove('bounceInUp');
		}

		this.slides.forEach(slide => {
			slide.style.display = 'none';
		});
		this.slides[this.slideIndex - 1].style.display = 'block';
		this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
	}

	plusSlides(step: number) {
		this.showSlides((this.slideIndex += step));
	}

	render() {
		this.hanson = document.querySelector('.hanson');
		this.buttons.forEach(button => {
			button.addEventListener('click', () => {
				this.plusSlides(1);
			});

			button.parentElement?.previousElementSibling?.addEventListener('click', e => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		});

		this.showSlides(this.slideIndex);
	}
}
