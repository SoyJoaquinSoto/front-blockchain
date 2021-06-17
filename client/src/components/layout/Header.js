import React from "react";
import LogOutBtn from "../auth/LogOutBtn";

function Header(props) {
	return (
		<div
			className={
				"flex justify-between items-center flex-wrap-reverse text-3xl font-bold w-full"
			}
		>
			<h1>{props.titulo}</h1>
			<div className={"flex items-center flex-wrap gap-2"}>
				<img src={"imgs/profile.svg"} alt={"perfil"} className={"w-8"} />
				<h1>{props.usuario}</h1>
				<LogOutBtn />
			</div>
		</div>
	);
}

export default Header;
