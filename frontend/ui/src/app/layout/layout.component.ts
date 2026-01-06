import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MapfileListComponent } from '../components/mapfile-list/mapfile-list.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule,MapfileListComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  onSelect(file: any) {
  console.log('Selected mapfile:', file);
  // Later: navigate to /editor/:id or load into editor
}

}

