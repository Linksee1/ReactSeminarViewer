import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./styles/main.css";

const App = () => {
	return (
		<div>
			<h1>Семинары</h1>
		</div>
	);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
