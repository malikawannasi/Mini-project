import { ItemService } from './item.service';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    createItems(items: any[]): Promise<import("mongodb").BulkWriteResult>;
}
