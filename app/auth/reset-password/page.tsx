"use client";

import { LoginTypes } from "@/types";
import GoogleSvg from "@/public/icons/Google.svg";
import { useAuthStore } from "@/store/authStore";
import isAuth from "@/components/Auth/IsAuth";
import Link from "next/link";
import TextLabelInput from "@/components/Inputs/TextLabelInput";
import IconButton from "@/components/Button/IconButton";
import TextLabelRadioInput from "@/components/Inputs/TextLabelRadioInput";
import SimpleButton from "@/components/Button/SimpleButton";
import { Formik } from "formik";
import { forgetPasswordTokenSchema } from "@/utils/validationSchema";
import { toast } from "react-toastify";
import { useEffect } from "react";

type handleSubmit = (email: string) => Promise<void>;

const ForgotPassword = () => {
	const resetPasswordToken = useAuthStore((state) => state.resetPasswordToken);
	const apiResponse = useAuthStore((state) => state.apiResponse);
	const clearApiResponse = useAuthStore((state) => state.clearApiResponse);
	const isLoading = useAuthStore((state) => state.loading);
	const isError = useAuthStore((state) => state.error);

	const handleSubmit: handleSubmit = async (email) => {
		try {
			await resetPasswordToken(email);
		} catch (error) {
			console.log({ error });
		}
	};

	useEffect(() => {
		if (typeof apiResponse === "string") {
			toast(apiResponse);
		}
	}, [apiResponse]);

	useEffect(() => {
		clearApiResponse();
	}, []);

	return (
		<div className='dark:bg-slate-900 bg-gray-100 flex min-h-screen h-full items-center'>
			<main className='font-satoshi w-full max-w-md mx-auto'>
				<div className='mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-4 sm:p-7'>
						<div className='text-center'>
							<h1 className='font-integralCF block text-2xl font-bold text-gray-800 dark:text-white'>
								Reset Password
							</h1>
							<p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
								Enter your user account's verified email address and we will
								send you a password reset link.
							</p>
						</div>

						<div className='mt-5'>
							<Formik
								initialValues={{
									email: "",
								}}
								validationSchema={forgetPasswordTokenSchema}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(async () => {
										setSubmitting(false);
										await handleSubmit(values.email);
									}, 400);
								}}>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isSubmitting,
								}) => (
									<form onSubmit={handleSubmit} className='grid gap-y-4'>
										<TextLabelInput
											name='email'
											title='email'
											onBlur={handleBlur}
											value={values.email}
											handleChange={handleChange}
											errors={errors.email && touched.email && errors.email}
										/>

										<SimpleButton
											type='submit'
											title='Submit'
											disabled={isSubmitting}
											isLoading={isLoading}
											buttonStyles='flex justify-self-end'
										/>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default isAuth(ForgotPassword);
