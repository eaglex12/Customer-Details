import React, { useEffect, useState } from "react";
import PhotoGrid from "./PhotoGrid";
import { Customer } from "../types/customer";
import { fetchPhotos } from "../services/service";

interface CustomerDetailsProps {
	customer: Customer | null;
}

const shuffleArray = (array: string[]) => {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
	const [photos, setPhotos] = useState<string[]>([]);

	useEffect(() => {
		const loadPhotos = async () => {
			try {
				const photoUrls = await fetchPhotos();
				setPhotos(shuffleArray(photoUrls));
			} catch (error) {
				console.error("Error loading photos:", error);
			}
		};

		if (customer) {
			loadPhotos();

			const intervalId = setInterval(() => {
				loadPhotos();
			}, 10000);

			return () => clearInterval(intervalId);
		}
	}, [customer]);

	if (!customer) {
		return (
			<div className="p-4 text-center text-gray-500">
				Please select a customer to view details.
			</div>
		);
	}

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg">
			<div className="mb-4">
				<h2 className="text-3xl font-extrabold text-gray-800">
					<span className="text-gray-800">Customer Name: </span>
					{customer.name}
				</h2>
			</div>
			<div className="mb-4">
				<p className="text-xl text-blue-600">
					<span className="font-semibold">Title: </span>
					{customer.title}
				</p>
			</div>
			<div className="mb-6">
				<p className="text-md text-gray-600">
					<span className="font-semibold">Address: </span>
					{customer.address}
				</p>
			</div>
			<PhotoGrid photos={photos} />
		</div>
	);
};

export default CustomerDetails;
