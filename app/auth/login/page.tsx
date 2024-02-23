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
import { loginSchema } from "@/utils/validationSchema";

const Login = () => {
	const loginApi = useAuthStore((state) => state.login);
	const isLoading = useAuthStore((state) => state.loading);
	const isError = useAuthStore((state) => state.error);

	const handleSubmit: LoginTypes["HandleSubmitType"] = async (
		emailOrUsername,
		password
	) => {
		try {
			await loginApi(emailOrUsername, password);
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<div className='dark:bg-slate-900 bg-gray-100 flex min-h-screen h-full items-center'>
			<main className='w-full max-w-md mx-auto'>
				<div className='mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-4 sm:p-7'>
						<div className='text-center'>
							<h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>
								Sign in
							</h1>
							<p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
								Don't have an account yet?
								<Link
									className='text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
									href='/auth/signup'>
									Sign up here
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
										emailOrUsername: "",
										password: "",
										radioButton: false,
									} as LoginTypes["FormValueType"]
								}
								validationSchema={loginSchema}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(async () => {
										setSubmitting(false);
										await handleSubmit(values.emailOrUsername, values.password);
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
											name='emailOrUsername'
											title='email or username'
											onBlur={handleBlur}
											value={values.emailOrUsername}
											handleChange={handleChange}
											errors={
												errors.emailOrUsername &&
												touched.emailOrUsername &&
												errors.emailOrUsername
											}
										/>

										<TextLabelInput
											name='password'
											title='password'
											inputType='password'
											onBlur={handleBlur}
											value={values.password}
											handleChange={handleChange}
											errors={
												errors.password && touched.password && errors.password
											}
										/>

										<TextLabelRadioInput labelText='Remember me' />

										<SimpleButton
											type='submit'
											title='Sign in'
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

export default isAuth(Login);
