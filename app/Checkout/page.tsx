"use client";

import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function Checkout() {
	const router = useRouter();

	const [product, setProduct] = useState({
		name: "Go FullStack with KnowledgeHut",
		price: 1000,
		productOwner: "KnowledgeHut",
		description:
			"This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.",
		quantity: 1,
	});

	const makePayment = async () => {
		console.log({ keys: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY });
		const stripe = await loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
		);
		const body = { product };
		const headers = {
			"Content-Type": "application/json",
		};

		const response = await fetch("http://localhost:8000/api/v1/checkout", {
			method: "POST",
			headers: headers,
			body: JSON.stringify(body),
		});

		const session = await response.json();

		console.log({ res: session });
		console.log({ id: session.data.id });

		const result = stripe.redirectToCheckout({
			sessionId: session.data.id,
		});

		setTimeout(() => {
			if (result.error) {
				console.log(result.error);
				router.push("/cancel");
			} else {
				router.push("/success");
			}
		}, 2000);
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='flex justify-center'>
				<div className='flex flex-col md:flex-row max-w-7xl justify-between items-center '>
					<div className='bg-white m-4 shadow-xl min-h-96 flex flex-col justify-between text-black hover:border-t-8 hover:border-r-8 hover:border-yellow-500 rounded-lg transition duration-400 ease-in'>
						<div className='m-8 h-6'>
							<div className='m-2'>{product.name}</div>
							<div className='m-2 text-3xl'>${product.price}</div>
							<div className='m-2 mt-8'>{product.description}</div>
						</div>
						<div className='flex justify-center'>
							<div
								className='bg-stone-900 text-white cursor-pointer m-4 px-8 py-1 rounded-2xl hover:bg-white hover:text-stone-900 font-medium'
								onClick={makePayment}>
								Buy now
							</div>
						</div>
					</div>
				</div>
			</div>
			<script src='https://cdn.tailwindcss.com'></script>
			<script src='https://use.fontawesome.com/03f8a0ebd4.js'></script>
			<script
				type='module'
				src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js'></script>
			<script
				nomodule
				src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'></script>
		</main>
	);
}
