import PriceCard from "@/components/Card/PriceCard";
import Skeleton from "@/components/Skeleton";
import { useAuthStore } from "@/store/authStore";
import { TGetProductAPI } from "@/types";
import { GetProductAPI } from "@/utils/Apis";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const NewArrivals = (props: Props) => {
	const userInfo = useAuthStore((state) => state.user);
	const storeRefreshAccessToken = useAuthStore(
		(state) => state.refreshAccessToken
	);

	const [products, setProducts] = useState<
		{
			_id: string;
			image: string;
			productName: string;
		}[]
	>([]);
	const [isLoading, setIsLoading] = useState(false);

	const GetAllProducts = async () => {
		try {
			setIsLoading(true);

			const response = await GetProductAPI(userInfo);

			if (response?.message === "Access token refreshed successfully!") {
				storeRefreshAccessToken(response.data);
			} else {
				const _response = response as TGetProductAPI;
				setProducts(_response.data);
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		GetAllProducts();
	}, [userInfo.data.accessToken]);

	return (
		<section className='bg-white max-w-[85rem] mx-auto py-16 px-4 sm:px-6 lg:px-8'>
			<h2 className='font-integralCF text-5xl font-bold text-center mb-14'>
				New Arrivals
			</h2>

			{/* Card Section */}
			{isLoading ? (
				<Skeleton />
			) : (
				<section className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
					{products.map((product) => (
						<Link href={"/product/" + product._id} key={product._id}>
							<PriceCard data={product} />
						</Link>
					))}
				</section>
			)}
		</section>
	);
};

export default NewArrivals;
