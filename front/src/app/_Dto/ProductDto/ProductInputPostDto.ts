export class ProductInputPostDto {
    productId: number = 0;
    productName: string;
    status: boolean;
    dateIn: any;
    dateOut: any;
    quantity: any;
    categoryId: any;
    constructor(categoryId: any) {
        this.categoryId = categoryId;
    }
}