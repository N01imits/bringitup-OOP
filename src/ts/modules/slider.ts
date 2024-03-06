interface ISliderSelectors {
	pageSelector: string;
	buttonsSelector: string;
}

export class Slider {
	page: HTMLDivElement | null;
	slides: NodeListOf<HTMLDivElement>;
	buttons: NodeListOf<HTMLButtonElement>;
	slideIndex: number;

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

		this.slides.forEach(slide => {
			slide.style.display = 'none';
		});
		this.slides[this.slideIndex - 1].style.display = 'block';
	}

	plusSlides(step: number) {
		this.showSlides((this.slideIndex += step));
	}

	render() {
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
