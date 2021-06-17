import React, { useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import Swal from "sweetalert2";

export default function Register() {
	const { getLoggedIn } = useContext(AuthContext);
	const history = useHistory();

	const validate = Yup.object({
		email: Yup.string()
			.email("No es un correo válido")
			.required("El correo es requerido"),
		password: Yup.string()
			.min(6, "La contraseña debe ser de 6 caracteres como mínimo")
			.max(10, "La contraseña debe ser de 10 caracteres como máximo")
			.required("La contraseña es requerida"),
		passwordVerify: Yup.string()
			.oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales")
			.required("Es requerido que confirme su contraseña"),
	});
	const PORT = process.env.PORT || 5000;
	return (
		<div className={"flex items-center align-center bg-gray-100 h-full"}>
			<Formik
				initialValues={{
					email: "",
					password: "",
					passwordVerify: "",
				}}
				validationSchema={validate}
				onSubmit={async (values, actions) => {
					try {
						await axios.post(`http://localhost:${PORT}/auth/`, values);
						await getLoggedIn();
						history.push("/");
					} catch (error) {
						Swal.fire({
							icon: "error",
							title: "Algo salió mal.",
							text: `${error.response.data.errorMessage}`,
						});
					}
				}}
			>
				{(formik) => (
					<div
						className={
							"flex flex-col border-2 border-ipn w-5/6 lg:w-1/3 py-5 items-center rounded-lg shadow-lg mx-auto bg-white"
						}
					>
						<h1 className="my-4 font-bold text-4xl lg:text-5xl">Registrarse</h1>
						<Form className={"w-4/5"}>
							<TextField label="Correo" name="email" type="email" />
							<TextField label="Contraseña" name="password" type="password" />
							<TextField
								label="Verificar Contraseña"
								name="passwordVerify"
								type="password"
							/>
							<button
								className="bg-ipn mt-3 border-2 border-white hover:border-ipn hover:bg-white hover:text-ipn rounded-md font-bold px-4 py-2 text-white w-full"
								type="submit"
							>
								Registrarse
							</button>
						</Form>
					</div>
				)}
			</Formik>
		</div>
	);
}
