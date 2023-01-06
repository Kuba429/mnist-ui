import { Component, createSignal, onMount } from "solid-js";
import { Canvas } from "./Canvas";
import { predict } from "./predict";

const App: Component = () => {
	const [canvas, setCanvas] = createSignal<HTMLCanvasElement | null>(null);
	const handleClick = async () => {
		const canvasL = canvas();
		if (!canvasL) return;
		console.log(await predict(canvasL));
	};

	return (
		<div>
			App
			<button onClick={handleClick}>Click</button>
			<Canvas setCanvas={setCanvas} />
		</div>
	);
};

export default App;
