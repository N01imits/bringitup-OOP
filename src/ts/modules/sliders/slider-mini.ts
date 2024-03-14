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
		if (this.slides.length === 0) {
			return;
		}
		this.slides.forEach(slide => {
			slide.classList.remove(this.activeClass ?? '');

			if (this.animate) {
				const cardTitle = slide.querySelector('.card__title');
				const cardControlsArrow = slide.querySelector('.card__controls-arrow');
				if (cardTitle instanceof HTMLDivElement) cardTitle.style.opacity = `0.4`;
				if (cardControlsArrow instanceof HTMLDivElement)
					cardControlsArrow.style.opacity = `0`;
			}
		});

		this.slides[0].classList.add(this.activeClass ?? '');
		if (this.animate) {
			const firstSlideCardTitle = this.slides[0].querySelector('.card__title');
			const firstSlideCardControlsArrow =
				this.slides[0].querySelector('.card__controls-arrow');
			if (firstSlideCardTitle instanceof HTMLDivElement)
				firstSlideCardTitle.style.opacity = `1`;
			if (firstSlideCardControlsArrow instanceof HTMLDivElement)
				firstSlideCardControlsArrow.style.opacity = `1`;
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
