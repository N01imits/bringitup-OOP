import { ISliderSelectors, Slider } from './slider';

export class MiniSlider extends Slider {
	constructor({
		containerSelector,
		nextButtonSelector,
		prevButtonSelector,
		activeClass,
		animate,
		autoPlay,
	}: ISliderSelectors) {
		super({
			containerSelector,
			nextButtonSelector,
			prevButtonSelector,
			activeClass,
			animate,
			autoPlay,
		});
	}

	decorizeSlides() {
		this.slides.forEach(slide => {
			slide.classList.remove(this.activeClass ?? '');

			if (this.animate) {
				(slide.querySelector('.card__title') as HTMLDivElement).style.opacity = `0.4`;
				(
					slide.querySelector('.card__controls-arrow') as HTMLDivElement
				).style.opacity = `0`;
			}
		});

		this.slides[0].classList.add(this.activeClass ?? '');
		if (this.animate) {
			(this.slides[0].querySelector('.card__title') as HTMLDivElement).style.opacity = `1`;
			(
				this.slides[0].querySelector('.card__controls-arrow') as HTMLDivElement
			).style.opacity = `1`;
		}
	}
	nextSlide() {
		this.container?.appendChild(this.slides[0]);
		this.slides.push(this.slides[0]);
		this.slides.shift();
		this.decorizeSlides();
	}

	prevSlide() {
		const active = this.slides[this.slides.length - 1];
		this.container?.insertBefore(active, this.slides[0]);
		this.slides.unshift(this.slides[this.slides.length - 1]);
		this.slides.pop();
		this.decorizeSlides();
	}

	bindTriggers() {
		this.nextButton?.addEventListener('click', () => this.nextSlide());

		this.prevButton?.addEventListener('click', () => this.prevSlide());
	}

	init() {
		if (this.container) {
			this.container.style.cssText = `
            display: flex;
						align-items: flex-start;
            flex-wrap: wrap;
						overflow: hidden;
        `;
		}
		this.bindTriggers();
		this.decorizeSlides();

		if (this.autoPlay) {
			setInterval(() => this.nextSlide(), 5000);
		}
	}
}
