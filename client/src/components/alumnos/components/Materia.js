import React from "react";
import Skeleton from "react-loading-skeleton";

function Materia({ materia, index, min }) {
	return (
		<div
			className={`${
				index % 2 === 0 ? "bg-gray-400" : "bg-gray-300"
			} flex flex-col justify-start px-5 py-2 border-black border-2`}
		>
			<h3 className={"font-bold mb-2"}>
				{materia.curso || <Skeleton height={25} />}
			</h3>
			<p>{materia.profesor || <Skeleton />}</p>
			{!min && (
				<div>
					<div className={"flex flex-row gap-2"}>
						{materia.dias && materia.dias.map((dia, i) => <p key={i}>{dia}</p>)}
					</div>
					<p>{materia.horario || <Skeleton count={2} />}</p>
				</div>
			)}
		</div>
	);
}

export default Materia;
