import { createContext } from "react";
import { Customer } from "../../types/customer";

type CustomersContextType = {
  customers: Customer[];
  activeCustomerId: string | undefined;
  loadCustomers: (customers: Customer[]) => void;
  setActiveCustomerId: (id: string | undefined) => void;
};

const CustomersContext = createContext<CustomersContextType | undefined>(
  undefined
);

export default CustomersContext;
