import React from "react";
import Header from "./Header";
import Body from "./Body";

function Layout(props) {
	return (
		<div className={"px-5 lg:px-20 py-5 h-screen w-screen flex flex-col gap-5"}>
			<Header titulo={props.titulo} usuario={props.usuario} />
			<Body>{props.children}</Body>
		</div>
	);
}

export default Layout;
