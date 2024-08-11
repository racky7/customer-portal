import { uid } from "uid";
import { Customer } from "../types/customer";
import { faker } from "@faker-js/faker";

export const CUSTOMER_CARD_HEIGHT = 192;

export function generateFakeCustomersData() {
  const customers: Customer[] = Array.from({ length: 1000 }, (_, index) => ({
    id: uid(),
    // name: faker.person.fullName(),
    name: `Customer - ${index}`,
    title: faker.lorem.paragraphs(),
    address: faker.location.streetAddress({
      useFullAddress: true,
    }),
    images: [],
  }));

  return customers;
}
