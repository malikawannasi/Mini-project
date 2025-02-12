import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import axios from 'axios';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})
export class ImportFileComponent {

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      this.processData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  }

  processData(data: any[]) {
    const transformedData = data.map(item => {
      // Vérification et traitement de item.name
      const name = item.name || '';  // Si item.name est undefined ou null, utiliser une chaîne vide

      // Vérification de la validité de la date
      const updatedAt = item.updated_on ? new Date(item.updated_on) : new Date(); // Utilise la date actuelle si `updated_on` est invalide
      const updatedAtISOString = updatedAt instanceof Date && !isNaN(updatedAt.getTime())
        ? updatedAt.toISOString()
        : null; // Retourne `null` si la date est invalide

      // Vérification de la validité de prices
      const prices = item.prices ? item.prices.split(';').map((p: string) => Math.max(0, parseFloat(p.replace(',', '.')))) : [];

      return {
        name: name,
        updated_at: updatedAtISOString, // Date convertie en ISO
        prices: prices, // Tableau de prix
        rate: parseFloat(item.rate),
        category: name.toLowerCase().includes('equipment') ? 'equipment' : 'product'  // Utilise name pour vérifier la catégorie
      };
    });

    this.sendToBackend(transformedData);
  }

  sendToBackend(data: any) {
    axios.post('http://localhost:3000/kraken', data)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }
}
