"use client";

import { ChangeOrderStatus, ClearCartApi } from "@/utils/Apis";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import withHeaderFooter from "@/components/HOC/withHeaderFooter";

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
		<section className='container self-center text-center'>
			<h2 className='font-integralCF text-xl'>Thanks for your order!</h2>
			<h4 className='font-integralCF text-lg'>Your payment is successful.</h4>
			<p className='font-satoshi text-md mt-2'>
				We appreciate your business! If you have any questions, please email us
				at
				<a href='mailto:orders@example.com'>orders@example.com</a>.
			</p>
			<div></div>
		</section>
	);
};

export default withHeaderFooter(Success) as React.FC;
