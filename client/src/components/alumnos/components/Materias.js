import React from "react";
import Materia from "./Materia";

function Materias(props) {
	return (
		<div className={"flex flex-col gap-3 h-full overflow-y-auto pb-20"}>
			{props.materias &&
				props.materias.map(
					(materia, index) =>
						materia.datosCurso && (
							<div key={index} className={"pr-3"}>
								<Materia
									materia={materia.datosCurso}
									index={index}
									min={props.min}
								/>
								{props.solicitud && (
									<button
										onClick={() => props.handleClick(materia.datosCurso)}
										className={`bg-gray-200 rounded-b-lg border-black border-2 border-t-0 font-bold w-full py-1`}
									>
										Solicitar
									</button>
								)}
							</div>
						)
				)}
		</div>
	);
}

export default Materias;
