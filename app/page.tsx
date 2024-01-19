"use client";

import isNotAuth from "@/components/Auth/isNotAuth";
import React from "react";

type Props = {};

const Home = (props: Props) => {
	return <div>Home</div>;
};

export default isNotAuth(Home);
