import { useContext } from "react";
import CustomersContext from "../contexts/customers/context";

export function useCustomers() {
  const customerContext = useContext(CustomersContext);

  if (!customerContext) {
    throw new Error("useCustomers must be used within a CustomersProvider");
  }
  return customerContext;
}
