import { uid } from "uid";
import { Customer } from "../types/customer";
import { faker } from "@faker-js/faker";

export const CUSTOMER_CARD_HEIGHT = 192;

export function generateRandomImages(count = 9) {
  return Array.from({ length: count }, () => faker.image.urlPicsumPhotos());
}

export function generateFakeCustomersData() {
  const customers: Customer[] = Array.from({ length: 1000 }, (_, index) => ({
    id: uid(),
    name: `Customer - ${index + 1}`,
    title: faker.lorem.paragraphs(),
    address: faker.location.streetAddress({
      useFullAddress: true,
    }),
    images: generateRandomImages(9),
  }));

  return customers;
}
