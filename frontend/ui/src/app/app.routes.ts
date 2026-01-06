import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MapEditorComponent } from './components/map-editor/map-editor.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MapEditorComponent },
      { path: 'editor', component: MapEditorComponent }
    ]
  }
];
