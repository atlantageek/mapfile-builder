import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface MapFileObject {
  id: number|null;
  name: string;
  content: string;
  extent:string;
  size:string;
} 

@Injectable({
  providedIn: 'root'
})
export class MapfileStateServiceService {
  private selectedMapfileSubject = new BehaviorSubject<MapFileObject|null>(null); 
  selectedMapfile$ = this.selectedMapfileSubject.asObservable(); 
  setSelectedMapfile(file: MapFileObject) { 
    this.selectedMapfileSubject.next(file); 
  }
  constructor() { }
}
