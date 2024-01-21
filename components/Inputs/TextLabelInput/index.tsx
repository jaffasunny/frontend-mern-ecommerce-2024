import React, { Dispatch, SetStateAction } from "react";
import InputErrorIcon from "@/public/icons/InputErrorIcon.svg";

interface FormValues {
	username?: string;
	password?: string;
	inputType?: string;
	[key: string]: object | string | undefined; // Index signature added
}

type Props<T> = {
	name: string;
	title: string;
	inputType?: string;
	onBlur: {
		(e: React.FocusEvent<any, Element>): void;
		<T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
	};
	value: string;
	handleChange: {
		(e: React.ChangeEvent<any>): void;
		<T = string | React.ChangeEvent<any>>(
			field: T
		): T extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
	errors: string | false | undefined;
};

const TextLabelInput = <T extends FormValues>({
	name,
	title,
	inputType,
	onBlur,
	value,
	handleChange,
	errors,
}: Props<T>) => {
	return (
		<div>
			<label htmlFor={name} className='block text-sm mb-2 dark:text-white'>
				{title}
			</label>
			<div className='relative'>
				<input
					type={inputType || ""}
					id={name}
					name={name}
					className='py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
					aria-describedby={`${name}-error`}
					onChange={handleChange}
					value={value}
					onBlur={onBlur}
				/>
				{/* Input Validation Error Icon */}
				<div
					className={`${
						errors ? "" : "hidden"
					} absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3`}>
					<InputErrorIcon className='h-5 w-5 text-red-500' />
				</div>
			</div>
			{/* Input Validation Error */}
			<p
				className={`${errors ? "" : "hidden"} text-xs text-red-600 mt-2`}
				id='email-error'>
				{errors}
			</p>
		</div>
	);
};

export default TextLabelInput;
