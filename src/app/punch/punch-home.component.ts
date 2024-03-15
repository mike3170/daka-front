import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-punch-home',
  standalone: true,
  imports: [
		RouterOutlet,
		MatButtonModule,
		RouterLink,


	],
  templateUrl: './punch-home.component.html',
  styleUrl: './punch-home.component.scss'
})
export class PunchHomeComponent {
	constructor(private http: HttpClient) {}

	doApi() {
		const url = `${environment.baseUrl}/test`;
		this.http.get<any>(url)
			.subscribe(resp => {
				console.log(resp);
			});
	}

}
