import { Component, onMount } from "solid-js";

const multiplier = 3;
const size = 28 * multiplier;
export const Canvas: Component<{
	setContext: any;
}> = (_props) => {
	let canvas: HTMLCanvasElement | undefined = undefined;
	let ctx: CanvasRenderingContext2D | null | undefined = undefined;
	let [canvasWidth, canvasHeight] = [0, 0];
	onMount(() => {
		if (canvas) {
			const computed = getComputedStyle(canvas);
			canvasWidth = parseInt(computed.width);
			canvasHeight = parseInt(computed.height);
		}
		ctx = canvas?.getContext("2d");
	});
	let pointerDown = false;
	const handleMove = (e: MouseEvent) => {
		if (!pointerDown) return;
		if (!canvas) return;
		const x = Math.floor((e.offsetX / canvasWidth) * size);
		const y = Math.floor((e.offsetY / canvasHeight) * size);
		if (!ctx) return;
		ctx.fillStyle = "#000000";
		ctx.fillRect(x, y, multiplier, multiplier);
		ctx.fillStyle = "#00000080";
		[1, -1].forEach((m) => {
			ctx!.fillRect(x + m, y, multiplier, multiplier);
			ctx!.fillRect(x, y + m, multiplier, multiplier);

			ctx!.fillRect(x + m, y + m, multiplier / 2, multiplier / 2);
			ctx!.fillRect(x + m, y + m, multiplier / 2, multiplier / 2);
		});
	};
	return (
		<canvas
			onClick={handleMove}
			onPointerDown={() => (pointerDown = true)}
			onPointerUp={() => (pointerDown = false)}
			onpointermove={handleMove}
			width={size}
			height={size}
			ref={canvas}
		></canvas>
	);
};
