import React from "react";

interface PhotoGridProps {
	photos: string[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
	return (
		<div className="grid grid-cols-3 gap-4 p-4">
			{photos.map((photo, index) => (
				<div
					key={index}
					className="relative overflow-hidden rounded-lg shadow-md"
				>
					<img
						src={photo}
						alt={`Photo ${index + 1}`}
						style={{ width: "12rem", height: "14rem" }}
						className="object-cover"
					/>
				</div>
			))}
		</div>
	);
};

export default PhotoGrid;
