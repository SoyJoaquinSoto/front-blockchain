import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import Peticion from "./components/Peticion";
import Swal from "sweetalert2";

function Profesor(props) {
	const [pendientes, setPendientes] = useState([
		{
			id: {
				creationTime: undefined,
			},
			datosAlumno: {
				boleta: undefined,
			},
			datosCurso: {
				curso: undefined,
			},
			estado: undefined,
		},
	]);

	const getPeticiones = () => {
		try {
			axios
				.get("https://upiblockchain.herokuapp.com/api/alumno/")
				.then(({ data }) => {
					var pe = data.filter((pet) => pet.estado === "Pendiente").reverse();
					setPendientes(pe);
				});
		} catch (error) {
			Swal.fire(
				"Error",
				"Ocurrió un error mientras se obtenian los datos",
				"error"
			);
		}
	};

	useEffect(() => {
		setInterval(() => {
			getPeticiones();
		}, 1000);
	}, []);

	const handleClick = async (index, estado) => {
		try {
			await axios.put(
				`https://upiblockchain.herokuapp.com/api/alumno/${pendientes[index].idInfo}`,
				{ ...pendientes[index], estado: estado }
			);
			if (estado === "Aprobado") {
				try {
					await axios.post(
						"https://upiblockchain.herokuapp.com/api/block",
						pendientes[index]
					);
				} catch (error) {
					Swal.fire("Error", "Ocurrió un error con la petición", "error");
				}
			}
			Swal.fire("", "Se realizó la acción correctamente", "success");
		} catch (error) {
			Swal.fire("Error", "Ocurrió un error con la petición", "error");
		}
	};

	return (
		<Layout titulo="Bandeja de cursos por aprobar" usuario="Profesor">
			<div className={"h-full flex flex-col gap-3"}>
				<div
					className={
						"grid grid-cols-5 py-4 pl-4 lg:pr-8 xl:pr-7 gap-3 text-white bg-gray-500 font-bold justify-items-center text-lg"
					}
				>
					<h2>Solicitante</h2>
					<h2>Curso</h2>
					<h2>Fecha</h2>
					<h2>Estado</h2>
					<h2>Acción</h2>
				</div>
				<div className={"flex flex-col gap-3 h-full overflow-y-scroll"}>
					{pendientes.map((registro, index) => (
						<Peticion
							key={index}
							registro={registro}
							index={index}
							handleClick={handleClick}
						/>
					))}
				</div>
			</div>
		</Layout>
	);
}

export default Profesor;
