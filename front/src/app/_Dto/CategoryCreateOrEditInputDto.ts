export class CategoryCreateOrEditInputDto {
    categoryId: number;
    categoryName: string;
    constructor() {
        this.categoryId = 0;
        this.categoryName = "";
    }
}