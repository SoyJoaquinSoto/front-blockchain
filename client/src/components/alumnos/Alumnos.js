import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Columna from "./components/Columna";
import Materias from "./components/Materias";
import { materias } from "../../helpers/materias";
import axios from "axios";
import _ from "underscore";
import Swal from "sweetalert2";

function Alumno(props) {
	useEffect(() => {
		setInterval(() => {
			getPeticiones();
		}, 1000);
	}, []);

	const [disponibles, setDisponibles] = useState([
		{
			datosCurso: {
				curso: undefined,
				profesor: undefined,
				horario: undefined,
			},
		},
	]);
	const [pendientes, setPendientes] = useState([
		{
			datosCurso: {
				curso: undefined,
				profesor: undefined,
				horario: undefined,
			},
		},
	]);
	const [aprobados, setAprobados] = useState([
		{
			datosCurso: {
				curso: undefined,
				profesor: undefined,
				horario: undefined,
			},
		},
	]);

	const getPeticiones = () => {
		try {
			axios.get("http://localhost:53560/api/alumno/").then(({ data }) => {
				const ap = data.filter((pet) => pet.estado === "Aprobado");
				setAprobados(ap);

				const pe = data.filter((pet) => pet.estado === "Pendiente");
				setPendientes(pe);

				var di = materias.filter(
					(mat) =>
						data.find((pet) => _.isEqual(pet.datosCurso, mat.datosCurso)) ===
							undefined || mat.estado === "Rechazado"
				); 

				setDisponibles(di);
			});
		} catch (error) {
			Swal.fire(
				"Error",
				"Ocurrió un error mientras se obtenian los datos",
				"error"
			);
		}
	};

	const handleClick = async (materia) => {
		if (materia.curso) {
			const data = {
				datosAlumno: {
					nombre: "Soto",
					boleta: "2019600416",
					carrera: "Ciencias",
				},
				datosCurso: materia,
			};

			try {
				await axios.post("http://localhost:53560/api/alumno/", data);
				Swal.fire("", "Se realizó la petición correctamente", "success");
			} catch (error) {
				Swal.fire(
					"Error",
					"Ocurrió un error mientras se hacía la petición",
					"error"
				);
			}

			getPeticiones();
		} else {
			Swal.fire(
				"Error",
				"Ocurrió un error mientras se hacía la petición",
				"error"
			);
		}
	};

	return (
		<Layout titulo="Alta de curso" usuario="Alumno">
			<div
				className={
					"flex flex-col lg:flex-row gap-5 lg:justify-between items-start h-full w-full"
				}
			>
				<Columna titulo="Solicitar curso">
					<Materias
						materias={disponibles}
						solicitud="true"
						handleClick={handleClick}
					/>
				</Columna>

				<Columna titulo="Peticiones en espera">
					<Materias materias={[...pendientes].reverse()} min="true" />
				</Columna>

				<Columna titulo="Mis cursos">
					<Materias materias={[...aprobados].reverse()} />
				</Columna>
			</div>
		</Layout>
	);
}

export default Alumno;
