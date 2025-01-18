import "./App.css";
import ShortsPanel from "./components/Shorts/ShortsPanel";
import UsersPanel from "./components/Users/UsersPanel";
import StartMenu from "./components/StartMenu/StartMenu";
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
	return (
		<Provider store={store}>
			<UsersPanel />
			<ShortsPanel />
			<StartMenu />
		</Provider>
	);
};

export default App;
