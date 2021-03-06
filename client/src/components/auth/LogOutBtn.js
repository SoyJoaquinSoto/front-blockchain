import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function LogOutBtn() {
	const { getLoggedIn } = useContext(AuthContext);

	const history = useHistory();

	async function logOut() {
		await axios.get(`/auth/logout`);
		await getLoggedIn();
		history.push("/");
	}

	return (
		<button
			onClick={logOut}
			className={
				"text-md font-bold bg-gray-300 border-2 border-black p-1 rounded-lg"
			}
		>
			Cerrar sesión
		</button>
	);
}

export default LogOutBtn;
