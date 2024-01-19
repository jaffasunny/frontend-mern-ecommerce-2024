"use client";

import { useState } from "react";
import { LoginTypes } from "@/types";
import GoogleSvg from "@/public/icons/Google.svg";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import isAuth from "@/components/Auth/IsAuth";
import Link from "next/link";
import TextLabelInput from "@/components/Inputs/TextLabelInput";
import IconButton from "@/components/Button/IconButton";
import TextLabelRadioInput from "@/components/Inputs/TextLabelRadioInput";
import SimpleButton from "@/components/Button/SimpleButton";

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

							<form onSubmit={handleSubmit} className='grid gap-y-4'>
								<TextLabelInput
									formValues={formValues}
									setFormValues={setFormValues}
									name='username'
									title='username'
									validationError='Please include a valid title so we can get back to you'
								/>

								<TextLabelInput
									formValues={formValues}
									setFormValues={setFormValues}
									name='password'
									title='password'
									validationError='8+ characters required'
								/>

								<TextLabelRadioInput />

								<SimpleButton type='submit' title='Sign in' />
							</form>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default isAuth(Login);
