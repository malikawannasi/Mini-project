// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schema';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb+srv://oiannacimlykh:gYMB8OiKLELeVv6h@cluster0.d3smm.mongodb.net/testNest?retryWrites=true&w=majority&appName=Cluster0'), // Connexion à MongoDB
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class AppModule {}