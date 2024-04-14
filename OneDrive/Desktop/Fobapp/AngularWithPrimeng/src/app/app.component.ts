import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularWithPrimeng';

  items? :MenuItem[]

  ngOnInit() {
    this.items = [
      {
        label: 'Datei',
        items: [
          {label: 'Neu', icon: 'pi pi-fw pi-plus', command: () => { /* Logik hier */ }},
          {label: 'Öffnen', icon: 'pi pi-fw pi-download', command: () => { /* Logik hier */ }},
        ]
      },
      {
        label: 'Bearbeiten',
        items: [
          {label: 'Rückgängig', icon: 'pi pi-fw pi-undo', command: () => { /* Logik hier */ }},
          {label: 'Wiederholen', icon: 'pi pi-fw pi-repeat', command: () => { /* Logik hier */ }},
        ]
      }
      // ... Weitere Menüpunkte
    ];


}
}
