
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MapfileStateServiceService,MapFileObject } from '../../services/mapfile-state-service.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-map-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent {
  mapConfig:MapFileObject = {
    name: 'example',
    extent: '-180 -90 180 90',
    size: '800 600',
    id:-1,
    content:''
  };

  generated = '';
  constructor(private state: MapfileStateServiceService, private _backend:BackendService) {

  }
  ngOnInit() {
    this.state.selectedMapfile$.subscribe(file=>{
      if(file) {
        this.generated=`# Mapfile: ${file.name}\n${file.content}`;
        this.mapConfig={
          name: file.name,
          extent: '...extracted from file...',
          size: '800 600',
          id:file.id,
          content:''
        }
      }
    }
  );
  }
  select(file:string) {
    return null;
  }
  writeMapfile() {
    // Logic to write the mapfile back to the backend
    console.log('Writing mapfile:', this.mapConfig.name);
    if (this.mapConfig.id !== null) {
      console.log('Mapfile ID:', this.mapConfig.id);
      this._backend.putMapfile(this.mapConfig.id,this.mapConfig.name,"this.generated").subscribe(response => {
      });
    } else {
      console.log('New mapfile, no ID yet.');
      this._backend.postMapfile(this.mapConfig.name,"this.generated").subscribe(response => {
      });
    }
    // Call backend service to save the mapfile
    
  }
} 

