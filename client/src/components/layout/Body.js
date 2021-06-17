import React from "react";

function Body(props) {
	return (
		<div className={"overflow-auto lg:overflow-hidden h-full"}>
			{props.children}
		</div>
	);
}

export default Body;
