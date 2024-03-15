import { Component } from '@angular/core';
import { PunchService } from '../punch/punch.service';
import { PunchCard } from '../punch/punch.model';
import { DateTime } from 'luxon';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-punch-list',
  standalone: true,
  imports: [
		MatRadioModule, MatButtonModule, MatIconModule,
		ReactiveFormsModule,
	],
  templateUrl: './punch-list.component.html',
  styleUrl: './punch-list.component.scss'
})

export class PunchListComponent {
	punchCardList: PunchCard[] = [];

	listType = new FormControl("1");

	constructor(private punchService: PunchService) {
		this.doQuery("1");
	}
	
	ngOninit(){
		console.log("hello");
		
		this.doQuery("1");
	}

	doQuery(listType: string) {
		this.punchService.query(listType)
			.subscribe(resp => {
				this.punchCardList = resp.data;
				this.punchCardList.forEach(card => {
					card.punchTime = DateTime.fromISO(card.punchTime as any);
				});
				console.log(this.punchCardList);				
			});
	}

	selectChange(rdoChange: MatRadioChange) {
		// console.log(rdoChange.value);
		this.doQuery(rdoChange.value);
	}

}
