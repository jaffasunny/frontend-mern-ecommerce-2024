import * as Yup from "yup";

export const loginSchema = Yup.object({
	emailOrUsername: Yup.string().required("Required"),
	password: Yup.string()
		.min(
			8,

			"Minimum 8 characters"
		)
		.required("Required"),
});

export const signupSchema = Yup.object({
	firstName: Yup.string().required("First Name is Required"),
	lastName: Yup.string().required("Last Name is Required"),
	username: Yup.string().required("Username is Required"),
	email: Yup.string().email("Invalid email").required("Email is Required"),
	password: Yup.string()
		.min(8, "Password must be of Minimum 8 characters")
		.required("Password is Required"),
	confirmPassword: Yup.string()
		.required("Confirm password is required")
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
	radioButton: Yup.bool().oneOf(
		[true],
		"You must accept the terms and conditions."
	),
});
