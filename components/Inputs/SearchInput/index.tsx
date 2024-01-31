import React from "react";

type Props = {
	inputStyles?: string;
};

const SearchInput = (props: Props) => {
	return (
		<div className='relative flex rounded-3xl shadow-sm'>
			<input
				type='text'
				id='hs-search-box-with-loading-5'
				name='hs-search-box-with-loading-5'
				className='py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-3xl text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 bg-[#F0F0F0] dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
				placeholder='Search'
			/>
			<div className='absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4'>
				<svg
					className='flex-shrink-0 h-4 w-4 text-gray-400'
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<circle cx='11' cy='11' r='8' />
					<path d='m21 21-4.3-4.3' />
				</svg>
			</div>
		</div>
	);
};

export default SearchInput;
