export class Address {
  name: string;
  surname: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;

  constructor(
    name: string,
    surname: string,
    phone: string,
    address: string,
    city: string,
    zipCode: string,
    country: string
  ) {
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.zipCode = zipCode;
    this.country = country;
  }
}
