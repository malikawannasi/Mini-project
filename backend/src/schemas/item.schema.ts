// src/item.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ unique: true })
  name: string;

  @Prop()
  updated_at: Date;

  @Prop([Number])
  prices: number[];

  @Prop()
  rate: number;

  @Prop({ enum: ['product', 'equipment'] })
  category: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

