export class Product {
  id: number;
  name: string;
  price: number;
  category: string;
  gender: string;
  color: string;
  size: string;
  picUrl: string;

  constructor(
    name: string,
    price: number,
    category: string,
    gender: string,
    color: string,
    size: string,
    id?: number
  ) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.gender = gender;
    this.color = color;
    this.size = size;
  }
}
