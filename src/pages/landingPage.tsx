import React, { useState, useEffect } from "react";
import CustomerList from "../components/CustomerList";
import CustomerDetails from "../components/CustomerDetails";
import { fetchCustomers, fetchPhotos } from "../services/service";
import { Customer } from "../types/customer";

const LandingPage: React.FC = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
		null
	);

	useEffect(() => {
		const loadCustomers = async () => {
			try {
				const customerData = await fetchCustomers();
				const photos = await fetchPhotos(1000);
				const updatedCustomers = customerData.map((customer, i) => ({
					...customer,
					photoUrls: photos.slice(i * 9, i * 9 + 9),
				}));
				setCustomers(updatedCustomers);
			} catch (error) {
				console.error("Error fetching customers or photos:", error);
			}
		};

		loadCustomers();
	}, []);

	const selectedCustomer =
		customers.find((c) => c.id === selectedCustomerId) || null;

	return (
		<div className="app">
			<div className="flex flex-col h-[auto] bg-gray-100">
				<header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
					Customer Portal
				</header>
				<div className="flex flex-grow">
					<aside className="w-1/4 p-4 bg-white shadow-lg border-r border-gray-200">
						<CustomerList
							customers={customers}
							selectedCustomerId={selectedCustomerId}
							onSelectCustomer={setSelectedCustomerId}
						/>
					</aside>
					<main className="w-3/4 p-4">
						<CustomerDetails customer={selectedCustomer} />
					</main>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
