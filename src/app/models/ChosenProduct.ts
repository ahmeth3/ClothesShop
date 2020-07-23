import { Product } from './Product';

export class ChosenProduct extends Product {
  quantity: string;
  chosenSize: string;
  product: Product;
  sellerId?: number;

  constructor(
    product: Product,
    quantity: string,
    chosenSize: string,
    sellerId?: number
  ) {
    super(
      product.name,
      product.price,
      product.category,
      product.gender,
      product.color,
      product.size,
      product.caption,
      product.composition,
      product.id
    );
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.gender = product.gender;
    this.color = product.color;
    this.size = product.size;
    this.caption = product.caption;
    this.composition = product.composition;
    this.picUrl = product.picUrl;
    this.productDetailsFolderUrl = product.productDetailsFolderUrl;
    this.quantity = quantity;
    this.chosenSize = chosenSize;
    this.sellerId = sellerId;
  }

  setProduct() {}
}
