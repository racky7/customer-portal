import { uid } from "uid";
import { Customer } from "../types/customer";
import { faker } from "@faker-js/faker";

export function generateFakeCustomersData() {
  const customers: Customer[] = Array.from({ length: 50 }, () => ({
    id: uid(),
    name: faker.person.fullName(),
    title: faker.lorem.paragraphs(),
    address: faker.location.streetAddress({
      useFullAddress: true,
    }),
    images: [],
  }));

  return customers;
}
