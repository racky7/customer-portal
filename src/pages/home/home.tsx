import { useEffect, useState } from "react";
import { useCustomers } from "../../hooks/use-customers";
import { generateFakeCustomersData } from "../../lib/customer";
import { fakeApiCall } from "../../lib/utils";
import CustomerCard from "../../components/customer-card";
import "./home.css";
import CustomerDetails from "../../components/customer-details/customer-details";

export default function Home() {
  const { customers, activeCustomerId, setActiveCustomerId, loadCustomers } =
    useCustomers();
  const [queryStatus, setQueryStatus] = useState<
    "loading" | "error" | "success" | undefined
  >(undefined);

  const fetchCustomers = async () => {
    const fakeCustomersData = generateFakeCustomersData();
    try {
      setQueryStatus("loading");
      const customersData = await fakeApiCall(fakeCustomersData);
      setQueryStatus("success");
      loadCustomers(customersData);
    } catch (error) {
      console.log(error);
      setQueryStatus("error");
    }
  };

  useEffect(() => {
    fetchCustomers();

    return () => {};
  }, []);

  return (
    <div className="home-shell">
      <div className="main-heading">Customer Portal</div>
      <div className="main-content">
        <div className="sidebar">
          {queryStatus === "loading" ? <div>Loading ....</div> : null}

          {queryStatus === "error" ? (
            <div>Error loading customers...</div>
          ) : null}

          {queryStatus === "success"
            ? customers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  isActive={
                    activeCustomerId ? customer.id === activeCustomerId : false
                  }
                  onCardSelect={() => {
                    setActiveCustomerId(customer.id);
                  }}
                />
              ))
            : null}
        </div>
        <CustomerDetails
          customer={customers.find((c) => c.id === activeCustomerId)}
        />
      </div>
    </div>
  );
}
