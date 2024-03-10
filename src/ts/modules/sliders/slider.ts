export interface ISliderSelectors {
	containerSelector: string;
	buttonsSelector: string;
	nextButtonSelector?: string;
	prevButtonSelector?: string;
}

export class Slider {
	container: HTMLDivElement | null;
	slides: NodeListOf<HTMLDivElement>;
	buttons: NodeListOf<HTMLButtonElement>;
	slideIndex: number;
	hanson: HTMLElement | null = null;

	constructor({
		containerSelector = '',
		buttonsSelector = '',
	}: ISliderSelectors) {
		this.container = document.querySelector(containerSelector);
		if (!this.container) throw new Error('Контейнер не найден');
		this.slides = this.container.querySelectorAll(':scope > div');
		this.buttons = document.querySelectorAll(buttonsSelector);
		this.slideIndex = 1;
	}
}
