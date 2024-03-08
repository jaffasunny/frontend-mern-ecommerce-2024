"use client";

import withHeaderFooter from "@/components/HOC/withHeaderFooter";
import isNotAuth from "@/components/Auth/isNotAuth";
import Skeleton from "@/components/Skeleton";
import React, { useEffect } from "react";
import IconButton from "@/components/Button/IconButton";
import ForwardArrow from "@/public/icons/ForwardArrow.svg";
import EmptyCartGif from "@/public/gifs/emptyCartGif.gif";
import Image from "next/image";
import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import { loadStripe, Stripe, StripeError } from "@stripe/stripe-js";
import { useAuthStore } from "@/store/authStore";

type Props = {};

interface SessionResponse {
	data: {
		id: string;
	};
	error: StripeError;
}

const Order = (props: Props) => {
	const order = useOrderStore((state) => state.order);
	const user = useAuthStore((state) => state.user);
	const getOrder = useOrderStore((state) => state.getOrder);
	const isLoading = useOrderStore((state) => state.loading);

	const pendingOrderId = order?.data.map((order) => order._id);

	useEffect(() => {
		getOrder();
	}, []);

	const makePayment = async () => {
		const stripe = await loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
		);
		// const body: { product: Product } = { product };
		const pendingOrder = order?.data.filter(
			(order) => order.status === "pending"
		)[0];
		const body = { orderId: pendingOrder?._id, product: pendingOrder?.cart };

		console.log("🚀 ~ makePayment ~ body:", body);
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
		<section className='text-gray-600 body-font overflow-hidden'>
			<div className='container px-5 py-10 mx-auto'>
				{isLoading ? (
					<Skeleton />
				) : order?.data.length ? (
					<>
						<h1 className='font-integralCF font-bold text-4xl text-black mb-2'>
							Your Order
						</h1>

						<section className='flex gap-2 justify-between md:flex-row flex-col mt-4'>
							{/* LEFT SECTION */}
							<section className='md:w-3/5 w-full rounded-2xl border border-black/10 px-3 py-2 bg-white'>
								{order?.data.map((order) =>
									order.status === "pending"
										? order?.cart.items.map(({ product, quantity, _id }) => (
												<section className='p-3'>
													<div className='flex justify-between sm:flex-row sm:gap-0 gap-3 flex-col sm:h-32'>
														<span className='bg-[#F2F0F1] w-32 h-32 p-2 rounded-lg sm:self-auto self-center'>
															<img
																src={product.image || ""}
																alt={"xyz"}
																className='md:w-11/12 md:h-11/12 w-full h-full object-contain mix-blend-multiply'
															/>
														</span>
														<div className='w-full h-full ml-2'>
															<div className='flex h-full justify-between'>
																<div className='flex flex-col justify-between h-full'>
																	<h2 className='font-satoshi font-bold xl:text-xl lg:text-lg sm:text-base text-sm text-black'>
																		{product.productName || "Product Name"}
																	</h2>

																	<p className='font-satoshi font-bold text-2xl text-black'>
																		${product.price || 0}
																	</p>
																</div>
																<div className='flex flex-col self-end items-end h-full'>
																	<div className='bg-[#F0F0F0] font-satoshi rounded-2xl w-32 flex justify-center items-center'>
																		<span className='text-xl text-black text-center'>
																			Quantity: {quantity || 0}
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<hr className='mt-3' />
												</section>
										  ))
										: ""
								)}
							</section>

							{/* RIGHT SECTION */}
							<section className='md:w-2/5 w-full rounded-2xl border border-black/10 px-6 py-5 bg-white h-1/2'>
								<h2 className='font-satoshi font-bold text-2xl text-black'>
									Cart Summary
								</h2>

								{/* <div className='flex justify-between items-center mt-5'>
									<h3 className='font-satoshi font-normal text-xl text-black/60'>
										Subtotal
									</h3>
									<p className='font-satoshi font-bold text-xl text-black'>
										$565
									</p>
								</div>

								<hr className='mt-5' /> */}

								<div className='flex justify-between items-center mt-5'>
									<h3 className='font-satoshi font-normal text-xl text-black'>
										Total
									</h3>
									<p className='font-satoshi font-bold text-2xl text-black'>
										{order?.data.map((order) =>
											order.status === "pending" ? order?.cart.totalPrice : ""
										)}
									</p>
								</div>

								{/* <Link
									href={{
										pathname: `/checkout`,
										query: {
											orderId: pendingOrderId && pendingOrderId[0], // should be `title` not `id`
										},
									}}> */}
								<IconButton
									endIcon={<ForwardArrow />}
									text='Add Payment'
									buttonStyles='!bg-black !rounded-3xl mt-5'
									textStyles='text-white font-satoshi text-base font-medium'
									onClick={makePayment}
								/>
								{/* </Link> */}
							</section>
						</section>
					</>
				) : (
					<div className='flex justify-center items-center flex-col gap-3 w-full h-full'>
						<Image
							src={EmptyCartGif}
							width={100}
							height={100}
							alt='Empty Gif'
						/>
						<h1 className='font-integralCF font-bold text-2xl text-black'>
							Your cart is empty!
						</h1>
					</div>
				)}
			</div>
		</section>
	);
};

export default isNotAuth(withHeaderFooter(Order));
