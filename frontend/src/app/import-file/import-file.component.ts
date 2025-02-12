import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import axios from 'axios';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})
export class ImportFileComponent {

  async handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      await this.processData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  }

  async processData(data: any[]) {
    const transformedData = data.map((item) => ({
      name: item.Name || '',
      updated_at: this.processDate(item.UpdatedOn),
      prices: this.processPrices(item.Prices),
      rate: parseFloat(item['Rate %']) || 0,
      category: this.determineCategory(item.Name)
    }));

    if (transformedData.length > 0) {
      await this.sendToBackend(transformedData);
    }
  }

  processDate(date: any) {
    if (date) {
      const excelStartDate = new Date(1899, 11, 31);
      const milliseconds = (date - 25569) * 86400 * 1000;
      const updatedAt = new Date(excelStartDate.getTime() + milliseconds);
      return updatedAt instanceof Date && !isNaN(updatedAt.getTime()) ? updatedAt.toISOString() : null;
    }
    return null;
  }

processPrices(prices: any) {
  if (prices && typeof prices === 'string') {
    return prices.split(';')
      .map((p: string) => parseFloat(p.replace(',', '.')))
      .filter((num) => !isNaN(num) && num >= 0); // Exclure NaN et les nombres négatifs
  }
  return [];
}


  determineCategory(name: string) {
    if (name && typeof name === 'string') {
      return name.toLowerCase().includes('equipment') ? 'equipment' : 'product';
    }
    return 'product';
  }

  async sendToBackend(data: any[]) {
    try {
      const response = await axios.post('http://localhost:3000/kraken', data);
      console.log('Réponse du backend:', response.data);
    } catch (error) {
      console.error('Erreur d\'envoi des données vers le backend:');
    }
  }
}