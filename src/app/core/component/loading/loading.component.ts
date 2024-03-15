import { Component, inject } from '@angular/core';
import { LoadingService } from '../../service/loading.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
		AsyncPipe,
		MatProgressSpinner,

	],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
	private loadinService = inject(LoadingService);

	loading$ = this.loadinService.loading$;

}
