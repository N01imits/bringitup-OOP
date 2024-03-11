export interface ISliderSelectors {
	containerSelector: string;
	buttonsSelector?: string;
	nextButtonSelector?: string;
	prevButtonSelector?: string;
	activeClass?: string;
	animate?: boolean;
	autoPlay?: boolean;
}

export class Slider {
	container: HTMLDivElement | null;
	slides: HTMLDivElement[];
	buttons: NodeListOf<HTMLButtonElement> | null;
	slideIndex: number;
	autoPopupImage: HTMLElement | null = null;
	nextButton: HTMLButtonElement | null = null;
	prevButton: HTMLButtonElement | null = null;
	activeClass: string | null = null;
	animate: boolean;
	autoPlay: boolean;

	constructor({
		containerSelector,
		buttonsSelector,
		prevButtonSelector,
		nextButtonSelector,
		activeClass,
		animate = false,
		autoPlay = false,
	}: ISliderSelectors) {
		this.container = document.querySelector(containerSelector);
		if (!this.container) throw new Error('Контейнер не найден');
		this.slides = Array.from(
			this.container.querySelectorAll(':scope > *:not(button)'),
		) as HTMLDivElement[];
		this.buttons = buttonsSelector ? document.querySelectorAll(buttonsSelector) : null;
		this.nextButton = nextButtonSelector ? document.querySelector(nextButtonSelector) : null;
		this.prevButton = prevButtonSelector ? document.querySelector(prevButtonSelector) : null;
		this.activeClass = activeClass ? activeClass : null;
		this.animate = animate;
		this.autoPlay = autoPlay;
		this.slideIndex = 1;
	}
}
