import React, { useState, useCallback } from "react";
import Collapse from "react-collapse";

function Columna(props) {
	const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(true);
	const onClick = useCallback(
		() => setIsButtonCollapseOpen(!isButtonCollapseOpen),
		[isButtonCollapseOpen]
	);

	return (
		<div
			className={`flex flex-col justify-start gap-3 ${
				isButtonCollapseOpen ? "h-full" : "h-auto"
			} w-full pr-5`}
		>
			<button
				aria-controls={props.titulo}
				aria-expanded={isButtonCollapseOpen}
				onClick={onClick}
				type="button"
				className={
					"grid grid-cols-9 bg-gray-500 text-white font-bold text-center rounded w-full py-1 border-black border-2 text-xl"
				}
			>
				<h2 className={"col-span-8"}>{props.titulo}</h2>
				<img
					src={`imgs/${isButtonCollapseOpen ? "open" : "closed"}.svg`}
					alt={"acción"}
					className={"w-8"}
				/>
			</button>
			<Collapse
				theme={{
					collapse: `${isButtonCollapseOpen ? "h-full pb-1" : "h-0"}`,
					content: "h-full",
				}}
				isOpened={isButtonCollapseOpen}
				id={props.titulo}
			>
				{props.children}
			</Collapse>
		</div>
	);
}

export default Columna;
