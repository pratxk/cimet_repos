import { useState } from "react";

interface FormType {
	fetchTheValue: (
		keyWord: string,
		checkbox: boolean,
		numberOfImages: number
	) => void;
}

const Form: React.FC<FormType> = ({ fetchTheValue }) => {

	const [keyWord, setKeyWord] = useState<string>("");
	const [checked, setChecked] = useState<boolean>(false);
	const [numberOfImages, setNumberOfImages] = useState<number>(0);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

		e.preventDefault();
		fetchTheValue(keyWord, checked, numberOfImages);

		setKeyWord("");
		
	};

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
			<h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
				Image Search
			</h1>

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<input
						required
						disabled={checked === true}
						type="text"
						placeholder="Enter your keyword!"
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
						value={keyWord}
						onChange={(e) => setKeyWord(e.target.value)}
					/>
				</div>

				<div className="flex items-center mb-4">
					<input
						type="checkbox"
						className="mr-2 focus:ring-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						checked={checked}
						onChange={(e) => setChecked(e.target.checked)}
					/>
					<span className="text-gray-700">Get Random Images</span>
				</div>

				<div className="mb-6">
					<input
						type="number"
						placeholder="Select number of images"
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
						value={numberOfImages}
						onChange={(e) => setNumberOfImages(parseInt(e.target.value, 10))}
					/>
				</div>

				<div className="text-center">
					<button
						type="submit"
						className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
					>
						Search Images
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
