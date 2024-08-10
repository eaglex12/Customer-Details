import React from "react";
import CustomerCard from "./CustomerCard";
import { Customer } from "../types/customer";

interface CustomerListProps {
	customers: Customer[];
	selectedCustomerId: number | null;
	onSelectCustomer: (id: number) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({
	customers,
	selectedCustomerId,
	onSelectCustomer,
}) => {
	return (
		<div className="flex flex-col space-y-4 overflow-y-auto max-h-screen">
			{customers.map((customer) => (
				<CustomerCard
					key={customer.id}
					id={customer.id}
					name={customer.name}
					title={customer.title}
					selected={customer.id === selectedCustomerId}
					onSelect={() => onSelectCustomer(customer.id)}
				/>
			))}
		</div>
	);
};

export default CustomerList;
