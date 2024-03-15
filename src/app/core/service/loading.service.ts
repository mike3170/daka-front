import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
	private loadingSubject = new BehaviorSubject<boolean>(false);

	loading$ = this.loadingSubject.asObservable();

  constructor() { }


	loadingOn(){
		this.loadingSubject.next(true);
	}

	loadingOff() {
		setTimeout(() => {
			this.loadingSubject.next(false);
		}, 250);
	}

}
