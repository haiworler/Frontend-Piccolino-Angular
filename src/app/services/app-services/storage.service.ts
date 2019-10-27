import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	private storage = new BehaviorSubject<string>(null);

	watch(): Observable<any> {
		return this.storage.asObservable();
	}

	setItem(key: string, token: string): void {
		localStorage.setItem(key, token);
		this.storage.next(token);
	}

	removeItem(): void {
		this.storage.next(null);
	}

}
