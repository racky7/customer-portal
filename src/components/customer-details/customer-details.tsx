import { Customer } from "../../types/customer";
import "./customer-details.css";

type CustomerDetailsProps = {
  customer: Customer | undefined;
};

export default function CustomerDetails({ customer }: CustomerDetailsProps) {
  if (!customer) {
    return (
      <div className="no-active-customer">
        Please select a customer from the list
      </div>
    );
  }
  return (
    <div className="customer-details-area">
      <div className="customer-name">{customer.name}</div>
      <div className="customer-title">{customer.title}</div>
      <div className="customer-address">{customer.address}</div>
    </div>
  );
}
