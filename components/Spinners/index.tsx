import React from "react";

type Props = {
	fullScreen?: boolean;
	iconColor?: string;
	backgroundColor?: string;
};

const Spinners = ({ fullScreen = true, iconColor, backgroundColor }: Props) => {
	return (
		<div
			className={`${fullScreen ? "h-full min-h-screen" : ""} flex flex-col ${
				backgroundColor ? backgroundColor : "bg-white"
			}`}>
			<div className='flex flex-auto flex-col justify-center items-center'>
				<div className='flex justify-center'>
					<div
						className={`animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full  ${
							iconColor ? iconColor : "dark:text-blue-500 text-blue-600 "
						}`}
						role='status'
						aria-label='loading'>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Spinners;
