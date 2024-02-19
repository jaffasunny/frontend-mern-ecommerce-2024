import React from "react";
import Spinners from "../Spinners";
import clsx from "clsx";

type Props = {
	type?: "button" | "submit" | "reset" | undefined;
	title: string;
	disabled?: boolean;
	isLoading?: boolean;
	buttonStyles?: string;
	onClick?: () => void;
};

const SimpleButton = ({
	type,
	title,
	disabled,
	isLoading,
	buttonStyles,
	onClick,
}: Props) => {
	return (
		<button
			type={type}
			disabled={disabled || false}
			className={clsx(
				"w-fit py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
				buttonStyles
			)}
			onClick={onClick}>
			{isLoading ? (
				<Spinners
					fullScreen={false}
					iconColor='text-white'
					backgroundColor='bg-blue-600'
				/>
			) : (
				title
			)}
		</button>
	);
};

export default SimpleButton;
