export class ProductSearchInputDto {
    productName: string;
    quantityFrom: number;
    quantityTo: number;
    unitOfMeasure: string;
    status: string;
    dateFrom: string;
    dateTo: string;
    categoryId: number;
    constructor() {
            this.productName = "";
            this.quantityFrom = 0;
            this.quantityTo = 0;
            this.unitOfMeasure = "";
            this.status = "";
            this.dateFrom = "";
            this.dateTo = "";
            this.categoryId = 0;
    }
}