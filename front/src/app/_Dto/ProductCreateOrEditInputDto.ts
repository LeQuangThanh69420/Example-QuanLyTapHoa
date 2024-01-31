export class ProductCreateOrEditInputDto {
    productId: number;
    productName: string;
    quantity: number;
    unitOfMeasure: string;
    unitPrice: number;
    unitOfCurrency: string;
    status: string;
    date: string;
    categoryId: number;
    constructor() {
            this.productId = 0;
            this.productName = "";
            this.quantity = 0;
            this.unitOfMeasure = "";
            this.unitPrice = 0;
            this.unitOfCurrency = "";
            this.status = "";
            this.date = "";
            this.categoryId = 0;
    }
}