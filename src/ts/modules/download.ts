const PATH = './mainbg.jpg';

export class Download {
	buttons: NodeListOf<HTMLButtonElement>;
	path: string | null = null;
	constructor(triggersSelector: string) {
		this.buttons = document.querySelectorAll(triggersSelector);
		this.path = PATH;
	}

	downloadItem(path: string, event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		const downloadLink = document.createElement('a');
		downloadLink.setAttribute('href', path);
		downloadLink.setAttribute('download', 'picture');
		downloadLink.style.display = `none`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}

	init() {
		this.buttons.forEach(button => {
			button.addEventListener('click', e => {
				e.preventDefault();
				e.stopPropagation();
				if (this.path) {
					this.downloadItem(this.path, e);
				}
			});
		});
	}
}
