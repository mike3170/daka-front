import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../../core/model/api.model';
import { PunchCard } from './punch.model';

@Injectable({
  providedIn: 'root'
})
export class PunchService {
	private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

	insert(punchCard: PunchCard): Observable<Api> {
		const url = `${this.baseUrl}/punch`; 
		return this.http.post<Api>(url, punchCard);
	}

	query(listType: string): Observable<Api> {
		const url = `${this.baseUrl}/punch/query?listType=${listType}`; 
		return this.http.get<Api>(url);
	}

}
