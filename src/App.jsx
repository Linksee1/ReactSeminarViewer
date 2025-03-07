import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./styles/main.css";
import SeminarList from "./components/SeminarList";

const App = () => {
	return (
		<div className="app">
			<h1 className="title">Семинары</h1>
			<SeminarList />
		</div>
	);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
