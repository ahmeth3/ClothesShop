export class Product {
  id: number;
  name: string;
  price: number;
  category: string;
  gender: string;
  color: string;
  size: string;
  caption: string;
  composition: string;
  picUrl: string;
  productDetailsFolderUrl: string;

  constructor(
    name: string,
    price: number,
    category: string,
    gender: string,
    color: string,
    size: string,
    caption: string,
    composition: string,
    id?: number
  ) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.gender = gender;
    this.color = color;
    this.size = size;
    this.caption = caption;
    this.composition = composition;
  }
}
