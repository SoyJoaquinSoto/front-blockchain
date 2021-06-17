import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Alumnos from "./components/alumnos/Alumnos";
import Profesores from "./components/profesores/Profesores";
import Administradores from "./components/administradores/Administradores";
import AuthContext from "./context/AuthContext";

function Router() {
	const { role } = useContext(AuthContext);

	return (
		<BrowserRouter>
			<div className={"h-full"}>
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					{role === "alumno" && (
						<Route path="/alumno">
							<Alumnos />
						</Route>
					)}
					{role === "profesor" && (
						<Route path="/profesor">
							<Profesores />
						</Route>
					)}
					{role === "admin" && (
						<Route path="/administrador">
							<Administradores />
						</Route>
					)}
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default Router;
