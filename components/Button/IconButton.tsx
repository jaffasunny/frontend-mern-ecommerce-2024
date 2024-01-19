import React, { ReactElement } from "react";

type Props = {
	icon: ReactElement<any, any>;
	text: string;
};

const IconButton = ({ icon, text }: Props) => {
	return (
		<button
			type='button'
			className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
			{icon}
			{text}
		</button>
	);
};

export default IconButton;
