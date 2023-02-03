import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import RawData from './pages/raw-data';

function App() {
return (
	<div className='app'>
	<Router>
	<Navbar />
	<Routes>
		<Route path='/' element={<Home />} />
		<Route path='/raw-data' element={<RawData/>} />
	</Routes>
	</Router>
	</div>
);
}

export default App;
