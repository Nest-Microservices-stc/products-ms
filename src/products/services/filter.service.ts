
import { Injectable } from '@nestjs/common';
import { PaginationProductDto } from '../dto';

@Injectable()
export class FilterService {
    private readonly mode = 'insensitive';
    private readonly searchFields = ['name'];

    getFilter(query: PaginationProductDto) {
        const filter: any = {};

        // if bd is sqlito not need this.mode
        if (query.search) {
            filter.OR = this.searchFields.map(field => ({
                [field]: { contains: query.search },
            }));
        }

        if (query.minPrice || query.maxPrice) {
            filter.price = {};
            if (query.minPrice) filter.price.gte = query.minPrice;
            if (query.maxPrice) filter.price.lte = query.maxPrice;
        }

        return filter;
    }
    
}