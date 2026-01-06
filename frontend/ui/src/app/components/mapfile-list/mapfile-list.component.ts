import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BackendService } from '../../services/backend.service';
import { MapFileObject, MapfileStateServiceService } from '../../services/mapfile-state-service.service';

@Component({
  selector: 'app-mapfile-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './mapfile-list.component.html',
  styleUrls: ['./mapfile-list.component.scss']
})
export class MapfileListComponent {
  @Output() selectMapfile = new EventEmitter<any>();
  constructor(private _backend:BackendService, private _mapfileService:MapfileStateServiceService) {}
  // Temporary mock data — replace with API call later
  mapfiles = [
    { id: 1, name: 'world.map' },
    { id: 2, name: 'parcels.map' },   
    { id: 3, name: 'zoning.map' },
    { id: 4, name: 'imagery.map' }
  ];
  ngOnInit() {
    this._backend.getMapFiles().subscribe((data:any)=>{
      this.mapfiles=data;
    });
  }
  
  create() {
    var newFile:MapFileObject = { id: null, name: 'new_mapfile.map',content:'',extent:'-180 -90 180 90',size:'800 600' };
    this._mapfileService.setSelectedMapfile(newFile);
  }
  choose(file: any) {
    this._backend.getMapfile(file.name).subscribe((data:any)=>{
      file.content=data.content;
      this._mapfileService.setSelectedMapfile(file);
      this.selectMapfile.emit(file);
    }
  );
  }
}

