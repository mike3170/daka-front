import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './core/component/loading/loading.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
		RouterOutlet, RouterLink, MatButtonModule,
		MatIconModule,
		LoadingComponent,
	],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'punch';
}
