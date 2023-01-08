import { Component, onMount, Setter } from "solid-js";

export const CANVAS_SIZE = 28;
export const Canvas: Component<{
	setCanvas: Setter<HTMLCanvasElement | null>;
}> = (props) => {
	let canvas: HTMLCanvasElement | undefined = undefined;
	let ctx: CanvasRenderingContext2D | null | undefined = undefined;
	let [canvasWidth, canvasHeight] = [0, 0];
	onMount(() => {
		if (canvas) {
			props.setCanvas(canvas);
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
		const x = Math.floor((e.offsetX / canvasWidth) * CANVAS_SIZE);
		const y = Math.floor((e.offsetY / canvasHeight) * CANVAS_SIZE);
		if (!ctx) return;
		ctx.fillStyle = "#000000";
		ctx.fillRect(x, y, 1, 1);
		[1, -1].forEach((m) => {
			ctx!.fillRect(x + m, y, 0.9, 0.9);
			ctx!.fillRect(x, y + m, 0.9, 0.9);
			ctx!.fillRect(x + m, y + m, 0.9, 0.9);
			ctx!.fillRect(x + m, y + m, 0.9, 0.9);
		});
	};
	return (
		<canvas
			onClick={handleMove}
			onPointerDown={() => (pointerDown = true)}
			onPointerUp={() => (pointerDown = false)}
			onpointermove={handleMove}
			width={CANVAS_SIZE}
			height={CANVAS_SIZE}
			ref={canvas}
		></canvas>
	);
};
