export interface ICardDisplaySelectors {
	containerSelector: string;
	cardsSelector: string;
}

export class CardDisplayManager {
	container: HTMLDivElement | null;
	cards: NodeListOf<HTMLDivElement> | null;
	counter: number;

	constructor({ containerSelector, cardsSelector }: ICardDisplaySelectors) {
		this.container = document.querySelector(containerSelector);
		this.cards = this.container?.querySelectorAll(cardsSelector) ?? null;
		this.counter = 0;
	}

	bindTriggers() {
		this.container?.querySelector('.plus')?.addEventListener('click', () => {
			if (this.cards && this.counter !== this.cards.length - 2) {
				this.cards[this.counter].style.display = 'flex';
				this.cards[this.counter].classList.add('animated', 'fadeIn');
				this.counter++;
			} else if (this.cards) {
				this.cards[this.counter].style.display = 'flex';
				this.cards[this.counter].classList.add('animated', 'fadeIn');
				this.cards[this.cards.length - 1].remove();
			}
		});
	}

	hideCards() {
		this.cards?.forEach((card, i, arr) => {
			if (i !== arr.length - 1) {
				card.style.display = 'none';
			}
		});
	}

	init() {
		this.hideCards();
		this.bindTriggers();
	}
}
