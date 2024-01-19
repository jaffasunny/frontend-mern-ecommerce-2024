"use client";

import { useEffect, useState } from "react";
import { LoginTypes } from "@/types";
import GoogleSvg from "@/public/icons/Google.svg";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import isAuth from "@/components/Auth/IsAuth";

const Login = () => {
	const [formValues, setFormValues] = useState<LoginTypes["FormValueType"]>({
		username: "",
		password: "",
	});
	const loginApi = useAuthStore((state) => state.login);
	const router = useRouter();

	const handleSubmit: LoginTypes["HandleSubmitType"] = async (event) => {
		event.preventDefault();

		try {
			console.log({
				email: formValues.username,
				password: formValues.password,
			});
			await loginApi(formValues.username, formValues.password);
			router.replace("/");
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<div className='dark:bg-slate-900 bg-gray-100 flex h-full items-center'>
			<main className='w-full max-w-md mx-auto p-6'>
				<div className='mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-4 sm:p-7'>
						<div className='text-center'>
							<h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>
								Sign in
							</h1>
							<p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
								Don't have an account yet?
								<a
									className='text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
									href='../examples/html/signup.html'>
									Sign up here
								</a>
							</p>
						</div>

						<div className='mt-5'>
							<button
								type='button'
								className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
								<GoogleSvg />
								Sign in with Google
							</button>

							<div className='py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600'>
								Or
							</div>

							<form onSubmit={handleSubmit} className='grid gap-y-4'>
								<div>
									<label
										htmlFor='email'
										className='block text-sm mb-2 dark:text-white'>
										Email address
									</label>
									<div className='relative'>
										<input
											type='username'
											id='username'
											name='username'
											className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
											required
											aria-describedby='username-error'
											onChange={(event) =>
												setFormValues({
													...formValues,
													username: event.target.value,
												})
											}
											value={formValues.username}
										/>
										<div className='hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
											<svg
												className='h-5 w-5 text-red-500'
												width='16'
												height='16'
												fill='currentColor'
												viewBox='0 0 16 16'
												aria-hidden='true'>
												<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
											</svg>
										</div>
									</div>
									<p
										className='hidden text-xs text-red-600 mt-2'
										id='email-error'>
										Please include a valid email address so we can get back to
										you
									</p>
								</div>

								<div>
									<div className='flex justify-between items-center'>
										<label
											htmlFor='password'
											className='block text-sm mb-2 dark:text-white'>
											Password
										</label>
										<a
											className='text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
											href='../examples/html/recover-account.html'>
											Forgot password?
										</a>
									</div>
									<div className='relative'>
										<input
											type='password'
											id='password'
											name='password'
											className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
											required
											aria-describedby='password-error'
											onChange={(event) =>
												setFormValues({
													...formValues,
													password: event.target.value,
												})
											}
											value={formValues.password}
										/>
										<div className='hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
											<svg
												className='h-5 w-5 text-red-500'
												width='16'
												height='16'
												fill='currentColor'
												viewBox='0 0 16 16'
												aria-hidden='true'>
												<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
											</svg>
										</div>
									</div>
									<p
										className='hidden text-xs text-red-600 mt-2'
										id='password-error'>
										8+ characters required
									</p>
								</div>

								<div className='flex items-center'>
									<div className='flex'>
										<input
											id='remember-me'
											name='remember-me'
											type='checkbox'
											className='shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800'
										/>
									</div>
									<div className='ms-3'>
										<label
											htmlFor='remember-me'
											className='text-sm dark:text-white'>
											Remember me
										</label>
									</div>
								</div>

								<button
									type='submit'
									className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
									Sign in
								</button>
							</form>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default isAuth(Login);
