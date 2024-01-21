import React from "react";

type Props = {
	type: "button" | "submit" | "reset" | undefined;
	title: string;
	disabled: boolean;
};

const SimpleButton = ({ type, title, disabled }: Props) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
			{title}
		</button>
	);
};

export default SimpleButton;
