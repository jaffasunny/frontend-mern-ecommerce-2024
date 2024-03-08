"use client";

import { ChangeOrderStatus, ClearCartApi } from "@/utils/Apis";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Success = () => {
	const searchParams = useSearchParams();

	useEffect(() => {
		const authValue = localStorage?.getItem("auth") as string;
		const auth = JSON.parse(authValue);
		const orderId = searchParams.get("orderId");

		if (orderId) {
			ChangeOrderStatus(auth.state.user, { orderId, status: "payed" })
				.then((res) => {
					ClearCartApi(auth.state.user)
						.then((res) => console.log(res))
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<>
			<h2>Thanks for your order!</h2>
			<h4>Your payment is successful.</h4>
			<p>
				We appreciate your business! If you have any questions, please email us
				at
				<a href='mailto:orders@example.com'>orders@example.com</a>.
			</p>
			<div></div>
		</>
	);
};

export default Success;
