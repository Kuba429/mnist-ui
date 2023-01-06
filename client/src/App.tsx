import { Component, onMount } from "solid-js";
import { Canvas } from "./Canvas";
import { predict } from "./predict";

const App: Component = () => {
	return (
		<div>
			App
			<button>Click</button>
			<Canvas setContext={{}} />
		</div>
	);
};

export default App;
