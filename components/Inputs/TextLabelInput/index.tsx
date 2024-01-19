import React, { Dispatch, SetStateAction } from "react";
import InputErrorIcon from "@/public/icons/InputErrorIcon.svg";

type Props = {
	formValues: { username: string; password: string };
	setFormValues: Dispatch<
		SetStateAction<{ username: string; password: string }>
	>;
	name: string;
	title: string;
	validationError?: string;
};

const TextLabelInput = ({
	formValues,
	setFormValues,
	name,
	title,
	validationError,
}: Props) => {
	return (
		<div>
			<label htmlFor='email' className='block text-sm mb-2 dark:text-white'>
				{title}
			</label>
			<div className='relative'>
				<input
					type={name}
					id={name}
					name={name}
					className='py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
					required
					aria-describedby={`${name}-error`}
					onChange={(event) =>
						setFormValues({
							...formValues,
							username: event.target.value,
						})
					}
					value={formValues.username}
				/>
				{/* Input Validation Error Icon */}
				<div className='hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
					<InputErrorIcon className='h-5 w-5 text-red-500' />
				</div>
			</div>
			{/* Input Validation Error */}
			<p className='hidden text-xs text-red-600 mt-2' id='email-error'>
				{validationError}
			</p>
		</div>
	);
};

export default TextLabelInput;
