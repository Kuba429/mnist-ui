import { Component, createSignal } from "solid-js";
import { Canvas } from "./components/Canvas";
import { predict } from "./predict";

const DEFAULT_DISPLAY_MESSAGE = "Draw a digit";
const App: Component = () => {
	const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement | null>(
		null
	);
	const [display, setDisplay] = createSignal(DEFAULT_DISPLAY_MESSAGE);
	const handleClick = async () => {
		const canvas = canvasRef();
		if (!canvas) return;
		const canvasArray = await canvasToArray(canvas);
		setDisplay(`My guess is: ${await predict(canvasArray)}`);
	};
	const handleClear = () => {
		const canvas = canvasRef();
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#ffffff00"; // canvasToArray only cares about alpha values, not colors so fillStyle must be fully transparent
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		setDisplay(DEFAULT_DISPLAY_MESSAGE);
	};
	return (
		<>
			<h2>{display()}</h2>
			<Canvas setCanvasRef={setCanvasRef} />
			<div class="buttons">
				<button onClick={handleClick}>Guess</button>{" "}
				<button onClick={handleClear}>Clear</button>
			</div>
		</>
	);
};

export default App;

async function canvasToArray(canvas: HTMLCanvasElement) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return [];

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	if (!imageData) return [];
	let arr: number[] = [];
	for (let i = 3; i < imageData.data.length; i += 4) {
		if (imageData.data[i] < 255) arr.push(imageData.data[i]);
		else arr.push(244);
	}
	const newArr: number[][] = [];
	let index = 0;
	for (let i = 0; i < 28; i++) {
		newArr.push([]);
		for (let j = 0; j < 28; j++) {
			newArr[i][j] = arr[index++];
		}
	}
	return newArr;
}
