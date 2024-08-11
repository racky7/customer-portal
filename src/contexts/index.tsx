import { CustomersContext } from "./customers";

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return <CustomersContext>{children}</CustomersContext>;
};

export default ContextWrapper;
