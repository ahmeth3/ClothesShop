import { Address } from './Address';
import { ChosenProduct } from './ChosenProduct';

export class Order extends Address {
  status: string;
  price: string;
  date: Date;
  orderedProducts: string;
  products?: ChosenProduct[];
  id?: number;
  buyerId?: number;

  constructor(
    address: Address,
    status: string,
    price: string,
    date: Date,
    orderedProducts: string
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
  }
}
