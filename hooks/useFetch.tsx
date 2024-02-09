import { useState } from "react";

function useFetch(apiCallFunction) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<object | null>(null);
	const [data, setData] = useState<object | null>(null);

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await apiCallFunction();
			setData(response);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, data, fetchData };
}

export default useFetch;
