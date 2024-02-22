import { Field } from "formik";
import React, { ReactNode } from "react";

type Props = {
	labelText: ReactNode;
	errors?: string | false | undefined;
};

const TextLabelRadioInput = ({ labelText, errors }: Props) => {
	return (
		<div className='flex items-start flex-col'>
			<div className='flex items-center'>
				<div className='flex'>
					<Field
						type='checkbox'
						name='radioButton'
						innerRef={(inputRef: any) => {
							if (inputRef) {
								inputRef.id = "remember-me";
							}
						}}
					/>
				</div>
				<div className='ms-3'>
					<label htmlFor='remember-me' className='text-sm dark:text-white'>
						{labelText}
					</label>
				</div>
			</div>
			{/* Input Validation Error */}
			<p
				className={`${errors ? "block" : "hidden"} text-xs text-red-600 mt-2`}
				id='email-error'>
				{errors}
			</p>
		</div>
	);
};

export default TextLabelRadioInput;
