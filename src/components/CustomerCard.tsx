import React from "react";

interface CustomerCardProps {
	id: number;
	name: string;
	title: string;
	selected: boolean;
	onSelect: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
	name,
	title,
	selected,
	onSelect,
}) => {
	return (
		<div
			className={`p-4 border rounded-lg cursor-pointer ${
				selected ? "bg-blue-500 text-white" : "bg-white text-black"
			}`}
			onClick={onSelect}
		>
			<h3 className="text-lg font-bold">{name}</h3>
			<p className="text-sm">{title}</p>
		</div>
	);
};

export default CustomerCard;
