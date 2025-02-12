import { Model } from 'mongoose';
import { ItemDocument } from './schemas/item.schema';
export declare class ItemService {
    private itemModel;
    constructor(itemModel: Model<ItemDocument>);
    processItems(items: any[]): Promise<{
        message: string;
    }>;
}
