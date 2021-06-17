import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
	const [loggedIn, setLoggedIn] = useState(undefined);
	const [role, setRole] = useState(undefined);

	async function getLoggedIn() {
		const loggedInRes = await axios.get(`/auth/loggedIn`);
		console.log(loggedInRes);
		setLoggedIn(loggedInRes.data.loggedIn);
		setRole(loggedInRes.data.role);
	}

	useEffect(() => {
		getLoggedIn();
	}, []);

	return (
		<AuthContext.Provider value={{ loggedIn, role, getLoggedIn }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
export { AuthContextProvider };
