import { memo } from "react";
import { Customer } from "../../types/customer";
import { truncateText } from "../../lib/utils";
import "./customer-card.css";

type CustomerCardProps = {
  customer: Pick<Customer, "id" | "name" | "title">;
  isActive: boolean;
  onCardSelect: () => void;
  style: React.CSSProperties;
};

const CustomerCard = memo(
  ({ customer, isActive, onCardSelect, style }: CustomerCardProps) => {
    return (
      <div
        className={`card-container ${isActive ? "card-active" : ""}`}
        style={style}
        onClick={() => {
          onCardSelect?.();
        }}
      >
        <div className="card-title">{truncateText(customer.name, 30)}</div>
        <div className="card-description">
          {truncateText(customer.title, 180)}
        </div>
      </div>
    );
  }
);

export default CustomerCard;
