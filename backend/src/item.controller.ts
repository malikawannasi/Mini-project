// src/item.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('kraken')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async createItems(@Body() items: any[]) {
    return this.itemService.processItems(items);
  }
}
