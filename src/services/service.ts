import axios from "axios";
import { Customer } from "../types/customer";

// Service to fetch customer data from a local JSON file
export const fetchCustomers = async (): Promise<Customer[]> => {
	try {
		const response = await axios.get<Customer[]>("/api/users.json");
		console.log("🚀 ~ fetchCustomers ~ response:", response);
		return response.data;
	} catch (error) {
		console.error("Error fetching customers:", error);
		throw error;
	}
};

// Service to fetch photos from the fake store API
export const fetchPhotos = async (count: number = 9): Promise<string[]> => {
	try {
		const response = await axios.get(
			`https://fakestoreapi.com/products?limit=${count}`
		);
		return response.data.map((product: any) => product.image);
	} catch (error) {
		console.error("Error fetching photos:", error);
		throw error;
	}
};
