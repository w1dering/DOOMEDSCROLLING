import "./App.css";
import ShortsPanel from "./components/Shorts/ShortsPanel";
import UsersPanel from "./components/Users/UsersPanel";
import DayTimer from "./components/DayTimer/DayTimer";

const App = () => {
	return (
		<>
			<UsersPanel />
			<ShortsPanel />
		</>
	);
};

export default App;
