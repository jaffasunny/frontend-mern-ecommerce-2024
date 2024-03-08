"use client";

import { loadStripe, Stripe, StripeError } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useOrderStore } from "@/store/orderStore";
import withHeaderFooter from "@/components/HOC/withHeaderFooter";
import isNotAuth from "@/components/Auth/isNotAuth";
import { useAuthStore } from "@/store/authStore";
import { useParams, useSearchParams } from "next/navigation";

interface Product {
	name: string;
	price: number;
	productOwner: string;
	description: string;
	quantity: number;
}

interface SessionResponse {
	data: {
		id: string;
	};
	error: StripeError;
}

const Checkout = () => {
	const order = useOrderStore((state) => state.order);
	const user = useAuthStore((state) => state.user);
	const searchParams = useSearchParams();

	const orderId = searchParams.get("orderId");

	const [product, setProduct] = useState<Product>({
		name: "Go FullStack with KnowledgeHut",
		price: 1000,
		productOwner: "KnowledgeHut",
		description:
			"This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.",
		quantity: 1,
	});

	const makePayment = async () => {
		const stripe = await loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
		);
		// const body: { product: Product } = { product };
		const body = order?.data.map((order) =>
			order.status === "pending" ? { product: order?.cart, orderId } : ""
		)[0];
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${user.data.accessToken}`,
		};

		const response = await fetch("http://localhost:8000/api/v1/checkout", {
			method: "POST",
			headers: headers,
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error(
				"Failed to create checkout session: " + response.statusText
			);
		}

		const session: SessionResponse = await response.json();

		console.log({ res: session });
		console.log({ id: session.data.id });

		stripe
			?.redirectToCheckout({
				sessionId: session.data.id,
			})
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
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
		</main>
	);
};

export default isNotAuth(withHeaderFooter(Checkout));
