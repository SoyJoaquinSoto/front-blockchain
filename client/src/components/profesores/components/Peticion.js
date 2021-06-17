import React from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

function Peticion({ registro, index, handleClick }) {
	return (
		<div
			className={`grid grid-cols-5 gap-3 grid-flow-row ${
				index % 2 === 0 ? "bg-gray-400" : "bg-gray-300"
			} text-center items-center p-4 -pl-4`}
		>
			<p>{registro.datosAlumno.boleta || <Skeleton />}</p>
			<p>{registro.datosCurso.curso || <Skeleton />}</p>
			<p>
				{registro.id.creationTime ? (
					moment(new Date(registro.id.creationTime)).format("L")
				) : (
					<Skeleton />
				)}
			</p>
			<p>{registro.estado || <Skeleton />}</p>
			<div className={"w-full flex gap-3 p-3"}>
				<button
					className={
						"p-1 rounded-lg w-1/2 justify-self-center bg-green-400 font-bold"
					}
					onClick={() => handleClick(index, "Aprobado")}
				>
					Aceptar
				</button>
				<button
					className={
						"p-1 rounded-lg w-1/2 justify-self-center bg-red-400 font-bold"
					}
					onClick={() => handleClick(index, "Rechazado")}
				>
					Rechazar
				</button>
			</div>
		</div>
	);
}

export default Peticion;
