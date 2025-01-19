import "./App.css";
import ShortsPanel from "./components/Shorts/ShortsPanel";
import UsersPanel from "./components/Users/UsersPanel";
import StartMenu from "./components/StartMenu/StartMenu";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useState } from "react";



const App = () => {
	const[loaded, setLoaded] = useState(false);
	document.title = "Hooked";
	
	return (
		<Provider store={store}>
			{loaded && (
				<>
					<UsersPanel />
					<ShortsPanel />
				</>
			)}
			<StartMenu loaded={() => (setLoaded(true))}/>
		</Provider>
	);
};

export default App;
