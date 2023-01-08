import { Component, createSignal } from "solid-js";
import { Canvas } from "./Canvas";

const App: Component = () => {
	const [canvas, setCanvas] = createSignal<HTMLCanvasElement | null>(null);
	const [display, setDisplay] = createSignal("");
	const handleClick = async () => {
		const canvasL = canvas();
		if (!canvasL) return;
		const p = await processCanvas(canvasL);
		setDisplay(JSON.stringify(p));
		const r = await fetch("http://127.0.0.1:5000", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				digit: 5,
				array: JSON.stringify(p),
			}),
		});
		console.log(r.ok);
	};

	return (
		<div>
			App
			<button onClick={handleClick}>Click</button>
			<Canvas setCanvas={setCanvas} />
			<h4>{display()}</h4>
		</div>
	);
};

export default App;

async function processCanvas(canvas: HTMLCanvasElement) {
	const bitMap = await createImageBitmap(canvas, {
		resizeHeight: 28,
		resizeWidth: 28,
		resizeQuality: "pixelated",
	});
	const newCtx = document.createElement("canvas").getContext("2d");
	if (!newCtx) return [];
	newCtx.drawImage(bitMap, 0, 0);
	const imageData = newCtx.getImageData(0, 0, 28, 28);
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
