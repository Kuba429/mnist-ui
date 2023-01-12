import { Component, createSignal } from "solid-js";
import { Canvas } from "./Canvas";

const getDigit = () => Math.floor(Math.random() * 10);
const App: Component = () => {
	const [canvas, setCanvas] = createSignal<HTMLCanvasElement | null>(null);
	const [digit, setDigit] = createSignal(getDigit());
	const [display, setDisplay] = createSignal("");
	const handleClick = async () => {
		const canvasL = canvas();
		if (!canvasL) return;
		const p = await processCanvas(canvasL);
		setDisplay(JSON.stringify(p));
		const r = await fetch("http://127.0.0.1:5000/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				digit: digit().toString(),
				array: JSON.stringify(p),
			}),
		});
		if (r.ok) setDigit(getDigit());
		clearCanvas(canvas());
	};

	return (
		<div>
			{digit()}
			<button onClick={handleClick}>submit</button>
			<button onClick={() => clearCanvas(canvas())}>Clear</button>
			<Canvas setCanvas={setCanvas} />
			<h4>{display()}</h4>
		</div>
	);
};

export default App;

function clearCanvas(canvas: HTMLCanvasElement | null) {
	const ctx = canvas?.getContext("2d");
	if (!ctx) return;
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
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
