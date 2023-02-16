import { makeAutoObservable } from 'mobx';


export class SlideStore {
	_slideIndex: number;
	_tabUsed: boolean;
	constructor() {
		this._slideIndex = 0;
		this._tabUsed = false;
		makeAutoObservable(this);
	}

	setSlideIndex(slideIndex: number): void {
		this._slideIndex = slideIndex;
	}

	setTabUsed(tabUsed: boolean): void {
		this._tabUsed = tabUsed;
	}

	get slideIndex() {
		return this._slideIndex;
	}

	get tabUsed() {
		return this._tabUsed;
	}
}
