import { useState } from "react";

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => setIsOpen(!isOpen);
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return { isOpen, toggleModal, openModal, closeModal };
};

export default useModal;
