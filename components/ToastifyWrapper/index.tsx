import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	children:
		| string
		| JSX.Element
		| JSX.Element[]
		| (() => JSX.Element)
		| React.ReactNode;
};

const ToastifyWrapper = ({ children }: Props) => {
	return (
		<>
			<ToastContainer />

			{children}
		</>
	);
};

export default ToastifyWrapper;
