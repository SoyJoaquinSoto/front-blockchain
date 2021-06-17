import React from "react";
import Skeleton from "react-loading-skeleton";

function Bloque({ bloque }) {
	return (
		<div className={"flex flex-col gap-2 justify-between p-4 bg-green-200"}>
			<div className={"flex flex-row gap-3"}>
				<h1 className={"font-bold flex-shrink-0 w-1/4"}>Nonce:</h1>
				<p className={"bg-white w-3/4 break-all"}>
					{bloque.nonce || <Skeleton />}
				</p>
			</div>

			<div className={"flex flex-row gap-3"}>
				<h1 className={"font-bold flex-shrink-0 w-1/4"}>Datos del alumno:</h1>
				<pre className={"bg-white w-3/4 overflow-auto"}>
					{JSON.stringify(bloque.datosAlumno, null, 4) || (
						<Skeleton height={120} />
					)}
				</pre>
			</div>

			<div className={"flex flex-row gap-3"}>
				<h1 className={"font-bold flex-shrink-0 w-1/4"}>Datos del curso:</h1>
				<pre className={"bg-white w-3/4 overflow-auto"}>
					{JSON.stringify(bloque.datosCurso, null, 4) || (
						<Skeleton height={180} />
					)}
				</pre>
			</div>

			<div className={"flex flex-row gap-3"}>
				<h1 className={"font-bold flex-shrink-0 w-1/4"}>Hash anterior:</h1>
				<p className={"bg-white w-3/4 break-all"}>
					{bloque.prevHash || <Skeleton height={40} />}
				</p>
			</div>

			<div className={"flex flex-row gap-3"}>
				<h1 className={"font-bold flex-shrink-0 w-1/4"}>Hash actual:</h1>
				<p className={"bg-white w-3/4 break-all"}>
					{bloque.hash || <Skeleton height={100} />}
				</p>
			</div>
		</div>
	);
}

export default Bloque;
