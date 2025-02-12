// src/item.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async processItems(items: any[]) {
    for (const item of items) {
      await this.itemModel.findOneAndUpdate(
        { name: item.name }, 
        item, 
        { upsert: true, new: true } // Insère ou met à jour
      );
    }
    return { message: 'Data imported successfully' };
  }
}
