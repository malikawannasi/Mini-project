import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportFileComponent } from './import-file/import-file.component'; // Importer votre composant de gestion de fichiers

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImportFileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
