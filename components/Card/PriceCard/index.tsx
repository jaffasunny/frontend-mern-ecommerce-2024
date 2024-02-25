import React from "react";

type Props = {
	data: {
		_id: string;
		image: string;
		productName: string;
		price: number;
	};
};

const PriceCard = ({ data }: Props) => {
	return (
		<div className='flex flex-col items-center rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] font-satoshi'>
			<span className='bg-[#F0EEED] w-full h-[240px] flex justify-center items-center rounded-lg'>
				<img
					className='w-[240px] h-[90%] rounded-t-xl mix-blend-multiply'
					src={
						data.image ||
						"https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
					}
					alt='Image Description'
				/>
			</span>
			<div className='mt-4 w-full'>
				<h3 className='text-black dark:text-white font-bold text-xl'>
					{data.productName || "T-SHIRT WITH TAPE DETAILS"}
				</h3>
				<p className='mt-1 text-black dark:text-black font-bold text-2xl'>
					${data.price || 50}
				</p>
			</div>
		</div>
	);
};

export default PriceCard;
