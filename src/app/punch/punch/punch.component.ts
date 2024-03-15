import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PunchService } from './punch.service';
import { PunchCard } from './punch.model';
import { SafePipe } from '../../core/pipe/safe.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { DateTime } from 'luxon';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'app-punch',
	standalone: true,
	imports: [
		MatButtonModule, MatIconModule, MatDialogModule,
		SafePipe, RouterLink
	],
	templateUrl: './punch.component.html',
	styleUrl: './punch.component.scss'
})
export class PunchComponent {
	@ViewChild('punchTmpl')
	punchTmpl: TemplateRef<any>;

	lat: number;  // 緯度 
	lng: number;  // 經度

	punchTime: string;
	punchDate: string;

	url: string;

	dialogRef: MatDialogRef<any>;

  // navigator.geolocation.getCurrentPosition options
	geoOptions = {
		enableHighAccuracy: true,
		timeout: 8000,
		maximumAge: 0,
	};

	constructor(
		private punchService: PunchService,
		private dialog: MatDialog,
		private router: Router) { 
		}

	punchCard: PunchCard;

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.initMap();
		}, 1200);
	}

	initMap() {
		navigator.geolocation.getCurrentPosition(
			this.initSuccessCallback.bind(this),
			this.errorCallback.bind(this),
			this.geoOptions);

	}

	initSuccessCallback(pos: GeolocationPosition) {
		this.lat = pos.coords.latitude;
		this.lng = pos.coords.longitude;

		// Choose z=18
		this.url = `https://maps.google.com/maps?q=${this.lat},${this.lng}&output=embed&z=18`;

		// this.url = "https://maps.google.com/maps?width=520&height=400&q=22.665318,120.303517&output=embed";
		// default z=16
		//this.url =  `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;

		//this.trustedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
		//console.log(this.trustedUrl);
	}

	errorCallback(error: GeolocationPositionError) {
		alert(JSON.stringify(error));
	}

	/**
	 * 上班打卡
	 */
	async punchIn() {
		navigator.geolocation.getCurrentPosition(
			this.punchInSuccess.bind(this),
			this.errorCallback.bind(this),
			this.geoOptions);
	}

	async punchInSuccess(pos: GeolocationPosition) {
		const punchCard: PunchCard = {
			empId: "001",
			punchTime: null,
			lat: this.lat,
			lng: this.lng,
			kind: "1"
		};

		const config: MatDialogConfig = {
			position: {
					top: "80px"
			}
		};

		const resp = await lastValueFrom(this.punchService.insert(punchCard));
		if (resp.success) {
			this.punchCard = resp.data;
			this.punchCard.punchTime = DateTime.fromISO(resp.data.punchTime as any)

			this.punchTime = this.punchCard.punchTime.toFormat("hh:mm:ss");
			this.punchDate = this.punchCard.punchTime.toISODate();

			this.dialogRef = this.dialog.open(this.punchTmpl, config);
		} else {
			alert(resp.message);
		}
	}

	/**
	 * 下班打卡
	 */
	async punchOut() {
		navigator.geolocation.getCurrentPosition(
			this.punchOutSuccess.bind(this),
			this.errorCallback.bind(this),
			this.geoOptions);
	}

	async punchOutSuccess(pos: GeolocationPosition) {
		const punchCard: PunchCard = {
			empId: "001",
			punchTime: null,
			lat: this.lat,
			lng: this.lng,
			kind: "2"
		};

		const config: MatDialogConfig = {
			position: {
					top: "80px"
			}
		};

		const resp = await lastValueFrom(this.punchService.insert(punchCard));
		if (resp.success) {
			this.punchCard = resp.data;
			this.punchCard.punchTime = DateTime.fromISO(resp.data.punchTime as any)

			this.punchTime = this.punchCard.punchTime.toFormat("hh:mm:ss");
			this.punchDate = this.punchCard.punchTime.toISODate();

			this.dialogRef = this.dialog.open(this.punchTmpl, config);
		} else {
			alert(resp.message);
		}
	}

	punchList() {
		this.dialogRef.close();
		this.router.navigateByUrl("/punch/punch-list");
	}


} // end class
