export interface ProductOutputGetDto {
    productId: number;
    productName: string;
    status: boolean;
    dateIn: Date;
    dateOut: Date;
    quantity: number;
    categoryId: any;
}