import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
	const [loggedIn, setLoggedIn] = useState(undefined);
	const [role, setRole] = useState(undefined);
	const PORT = process.env.PORT || 5000;

	async function getLoggedIn() {
		const loggedInRes = await axios.get(
			`http://localhost:${PORT}/auth/loggedIn`
		);
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
