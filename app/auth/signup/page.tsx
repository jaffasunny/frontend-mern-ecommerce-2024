"use client";

import React, { useEffect, useState } from "react";
import GoogleSvg from "@/public/icons/Google.svg";
import Link from "next/link";
import IconButton from "@/components/Button/IconButton";
import TextLabelInput from "@/components/Inputs/TextLabelInput";
import { SignupTypes } from "@/types";
import TextLabelRadioInput from "@/components/Inputs/TextLabelRadioInput";
import SimpleButton from "@/components/Button/SimpleButton";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { signupSchema } from "@/utils/validationSchema";

type Props = {};

const Signup = (props: Props) => {
	const signupApi = useAuthStore((state) => state.signup);
	const apiResponse = useAuthStore((state) => state.apiResponse);
	const isLoading = useAuthStore((state) => state.loading);
	const isError = useAuthStore((state) => state.error);
	const clearApiResponse = useAuthStore((state) => state.clearApiResponse);

	const router = useRouter();

	const handleSubmit: SignupTypes["HandleSubmitType"] = async (
		firstName,
		lastName,
		username,
		email,
		password
	) => {
		try {
			await signupApi(firstName, lastName, username, email, password);
		} catch (error) {
			console.log({ error });
		}
	};

	useEffect(() => {
		if (apiResponse) {
			router.replace("/auth/login");
			clearApiResponse();
		}
	}, [apiResponse]);

	return (
		<div className='dark:bg-slate-900 bg-gray-100 flex min-h-screen h-full items-center'>
			<main className='font-satoshi w-full max-w-md mx-auto'>
				<div className='mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-4 sm:p-7'>
						<div className='text-center'>
							<h1 className='font-integralCF block text-2xl font-bold text-gray-800 dark:text-white'>
								Sign up
							</h1>
							<p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
								Already have an account?{" "}
								<Link
									className='text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
									href='/auth/login'>
									Sign in here
								</Link>
							</p>
						</div>

						<div className='mt-5'>
							<IconButton
								icon={<GoogleSvg className='w-4 h-auto' />}
								text='Sign in with Google'
							/>

							<div className='py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600'>
								Or
							</div>

							<Formik
								initialValues={
									{
										firstName: "",
										lastName: "",
										username: "",
										email: "",
										password: "",
										confirmPassword: "",
										radioButton: false,
									} as SignupTypes["FormValueType"]
								}
								validationSchema={signupSchema}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(async () => {
										setSubmitting(false);
										await handleSubmit(
											values.firstName,
											values.lastName,
											values.username,
											values.email,
											values.password
										);
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
											name='firstName'
											title='First Name'
											onBlur={handleBlur}
											value={values.firstName}
											handleChange={handleChange}
											errors={
												errors.firstName &&
												touched.firstName &&
												errors.firstName
											}
										/>
										<TextLabelInput
											name='lastName'
											title='Last Name'
											onBlur={handleBlur}
											value={values.lastName}
											handleChange={handleChange}
											errors={
												errors.lastName && touched.lastName && errors.lastName
											}
										/>
										<TextLabelInput
											name='username'
											title='Username'
											onBlur={handleBlur}
											value={values.username}
											handleChange={handleChange}
											errors={
												errors.username && touched.username && errors.username
											}
										/>
										<TextLabelInput
											name='email'
											title='Email'
											onBlur={handleBlur}
											value={values.email}
											handleChange={handleChange}
											errors={errors.email && touched.email && errors.email}
										/>
										<TextLabelInput
											name='password'
											title='Password'
											inputType='password'
											onBlur={handleBlur}
											value={values.password}
											handleChange={handleChange}
											errors={
												errors.password && touched.password && errors.password
											}
										/>
										<TextLabelInput
											name='confirmPassword'
											title='Confirm Password'
											inputType='password'
											onBlur={handleBlur}
											value={values.confirmPassword}
											handleChange={handleChange}
											errors={
												errors.confirmPassword &&
												touched.confirmPassword &&
												errors.confirmPassword
											}
										/>
										<TextLabelRadioInput
											labelText={
												<>
													I accept the{" "}
													<a
														className='text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
														href='#'>
														Terms and Conditions
													</a>
												</>
											}
											errors={errors.radioButton}
										/>
										<SimpleButton
											type='submit'
											title='Sign up'
											disabled={isSubmitting}
											isLoading={isLoading}
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

export default Signup;
