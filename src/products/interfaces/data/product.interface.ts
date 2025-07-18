import { Product } from "generated/prisma";

export interface FindAllResponse {
    data: Product[];
    totalPages: number;
}
