import { Address } from './Address';

export class Order extends Address {
  status: string;
  price: string;
  date: Date;
  id?: number;
  buyerId?: number;

  constructor(address: Address, status: string, price: string, date: Date) {
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
    this.name = address.name;
    this.surname = address.surname;
    this.phone = address.phone;
    this.address = address.address;
    this.city = address.city;
    this.zipCode = address.zipCode;
    this.country = address.country;
  }
}
