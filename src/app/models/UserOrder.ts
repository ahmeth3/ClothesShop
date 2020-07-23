import { Address } from './Address';
import { ChosenProduct } from './ChosenProduct';

export class UserOrder extends Address {
  status: string;
  price: string;
  date: Date;
  orderedProducts: string;
  products?: ChosenProduct[];
  sellerId: number;
  id?: number;
  buyerId?: number;
  email: string;

  constructor(
    address: Address,
    status: string,
    price: string,
    date: Date,
    orderedProducts: string,
    sellerId: number
  ) {
    super(
      address.name,
      address.surname,
      address.phone,
      address.address,
      address.city,
      address.zipCode,
      address.country
    );
    this.status = status;
    this.price = price;
    this.date = date;
    this.orderedProducts = orderedProducts;
    this.products = [];
    this.name = address.name;
    this.surname = address.surname;
    this.phone = address.phone;
    this.address = address.address;
    this.city = address.city;
    this.zipCode = address.zipCode;
    this.country = address.country;
    this.sellerId = sellerId;
  }
}
