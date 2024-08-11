import { Customer } from "../../types/customer";

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
      <div>{customer.name}</div>
      <div>{customer.title}</div>
    </div>
  );
}
