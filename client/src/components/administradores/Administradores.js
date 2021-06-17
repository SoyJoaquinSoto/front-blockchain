import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Bloque from "./components/Bloque";
import axios from "axios";
import Swal from "sweetalert2";

function Alumno(props) {
	const [bloques, setBloques] = useState([
		{
			undefined,
		},
	]);

	const getBloques = () => {
		try {
			axios.get("http://localhost:53560/api/block/").then(({ data }) => {
				setBloques(data);
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
			getBloques();
		}, 1000);
	}, []);

	return (
		<Layout titulo="Blockchain de cursos" usuario="Administrador">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-3 grid-flow-row w-full h-full overflow-y-auto">
				{bloques &&
					bloques.map((bloque, index) => {
						return <Bloque key={index} bloque={bloque} />;
					})}
			</div>
		</Layout>
	);
}

export default Alumno;
