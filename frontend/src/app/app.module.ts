import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Assurez-vous que le composant AppComponent existe
import { ImportFileComponent } from './import-file/import-file.component'; // Importer votre composant de gestion de fichiers

@NgModule({
  declarations: [
    AppComponent, // Déclarez AppComponent
    ImportFileComponent // Déclarez ImportFileComponent ici
  ],
   exports:[ImportFileComponent],
  imports: [
    BrowserModule, // Importez les modules nécessaires, ici BrowserModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent] // Le composant qui va être bootstrapé (chargé au démarrage)
})
export class AppModule { }
