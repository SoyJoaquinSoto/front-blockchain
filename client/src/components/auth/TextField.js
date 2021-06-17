import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
	const [field] = useField(props);
	return (
		<div className="my-4">
			<input
				className={`bg-blue shadow-none border-2 border-black rounded w-full py-1`}
				placeholder={label}
				{...field}
				{...props}
				autoComplete="off"
			/>
			<ErrorMessage
				component="div"
				name={field.name}
				className=" text-red-500"
			/>
		</div>
	);
};
