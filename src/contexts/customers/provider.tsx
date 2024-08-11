import { useState } from "react";
import CustomersContext from "./context";
import { Customer } from "../../types/customer";

const CustomersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activeCustomerId, setActiveCustomerId] = useState<string | undefined>(
    undefined
  );

  const loadCustomers = (customersData: Customer[]) => {
    setCustomers(customersData);
  };

  return (
    <CustomersContext.Provider
      value={{
        customers,
        loadCustomers,
        activeCustomerId,
        setActiveCustomerId,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersContextProvider;
