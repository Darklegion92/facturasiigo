import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import DataProvider from './components/context/context';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<DataProvider>
			<Router>
				<App />
			</Router>
		</DataProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
