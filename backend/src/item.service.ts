import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>) {}

  async processItems(items: any[]) {
    console.log("Processing items:", items);
    
    if (!Array.isArray(items)) {
      throw new Error("Les données doivent être un tableau");
    }

    const validItems = items.map(item => ({
      ...item,
      updated_at: item.updated_at ? new Date(item.updated_at) : null,  // Convertir la date
      prices: Array.isArray(item.prices) ? item.prices.map(price => parseFloat(price)) : [],
      rate: parseFloat(item.rate) || 0,  // Convertir en nombre
      category: item.category || 'product',  // Catégorie par défaut
    }));

    // Mise à jour ou insertion des éléments
    const operations = validItems.map(item => ({
      updateOne: {
        filter: { name: item.name }, // Recherche par nom
        update: { $set: item }, // Met à jour ou insère
        upsert: true, // Crée l'élément s'il n'existe pas
      }
    }));

    return this.itemModel.bulkWrite(operations);
  }
}

