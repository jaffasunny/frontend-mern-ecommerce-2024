import React from "react";
import Navbar from "../shared/Navbar";

type Props = {};

type HeaderType = (props: Props) => JSX.Element;

const Header: HeaderType = (props: Props) => {
	return (
		<header className='backdrop-blur-lg bg-white/30 top-5 left-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 text-sm sticky w-[95%] mx-auto rounded-[35px] max-w-[85rem]'>
			<Navbar />
		</header>
	);
};

export default Header;
