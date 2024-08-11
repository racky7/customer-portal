import { Customer } from "../../types/customer";
import { truncateText } from "../../lib/utils";
import "./customer-card.css";

type CustomerCardProps = {
  customer: Pick<Customer, "id" | "name" | "title">;
  isActive: boolean;
  onCardSelect: () => void;
};

export default function CustomerCard({
  customer,
  isActive,
  onCardSelect,
}: CustomerCardProps) {
  return (
    <div
      className={`card-container ${isActive ? "card-active" : ""}`}
      onClick={() => {
        onCardSelect?.();
      }}
    >
      <div className="card-title">{customer.name}</div>
      <div className="card-description">
        {truncateText(customer.title, 180)}
      </div>
    </div>
  );
}
