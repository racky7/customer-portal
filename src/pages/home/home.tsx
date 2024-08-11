import { useEffect, useRef, useState } from "react";
import { useCustomers } from "../../hooks/use-customers";
import CustomerCard from "../../components/customer-card";
import CustomerDetails from "../../components/customer-details/customer-details";
import { useVirtualizer } from "../../hooks/use-virtualizer";
import {
  CUSTOMER_CARD_HEIGHT,
  generateFakeCustomersData,
} from "../../lib/customer";
import { fakeApiCall } from "../../lib/utils";
import "./home.css";

export default function Home() {
  const { customers, activeCustomerId, setActiveCustomerId, loadCustomers } =
    useCustomers();
  const [queryStatus, setQueryStatus] = useState<
    "loading" | "error" | "success" | undefined
  >(undefined);
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: customers.length,
    itemSize: CUSTOMER_CARD_HEIGHT,
    overscan: 10,
    getScrollElement: () => parentRef.current,
  });

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
        <div className="sidebar" ref={parentRef}>
          {queryStatus === "loading" ? (
            <div className="loading">Loading ....</div>
          ) : null}

          {queryStatus === "error" ? (
            <div className="error">Error loading customers.</div>
          ) : null}

          {queryStatus === "success" ? (
            <div
              style={{
                height: `${customers.length * CUSTOMER_CARD_HEIGHT}px`,
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems()?.map((virtualItem) => {
                const customer = customers[virtualItem.index];

                return (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    isActive={
                      activeCustomerId
                        ? customer.id === activeCustomerId
                        : false
                    }
                    onCardSelect={() => {
                      setActiveCustomerId(customer.id);
                    }}
                    style={{
                      transform: `translateY(${virtualItem.start}px)`,
                      position: "absolute",
                      height: `${CUSTOMER_CARD_HEIGHT}px`,
                    }}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
        <CustomerDetails
          key={activeCustomerId}
          customer={customers.find((c) => c.id === activeCustomerId)}
        />
      </div>
    </div>
  );
}
