"use client";

import isNotAuth from "@/components/Auth/isNotAuth";
import React from "react";
import withHeaderFooter from "./withHeaderFooter";
import HeroSection from "@/components/Home/HeroSection";
import NewArrivals from "@/components/Home/NewArrivals";

type Props = {};

const Home = (props: Props) => {
	return (
		<div className='min-h-screen h-full mt-5'>
			<HeroSection />

			<NewArrivals />
		</div>
	);
};

export default isNotAuth(withHeaderFooter(Home));
