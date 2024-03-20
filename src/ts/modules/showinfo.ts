export class ShowInfo {
	buttons: NodeListOf<HTMLButtonElement>;

	constructor(triggersSelector: string) {
		this.buttons = document.querySelectorAll(triggersSelector);
	}

	init() {
		this.buttons.forEach(button => {
			button.addEventListener('click', () => {
				const nextSiblingDiv = button.closest('.module__info-show')?.nextElementSibling;
				nextSiblingDiv?.classList.toggle('msg');
				if (nextSiblingDiv instanceof HTMLDivElement) {
					nextSiblingDiv.style.marginTop = '20px';
				}
			});
		});
	}
}
