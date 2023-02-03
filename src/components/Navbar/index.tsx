import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to="/">
			Home
		</NavLink>
		<NavLink to="/raw-data">
			Raw Data
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
