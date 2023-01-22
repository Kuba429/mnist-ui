import { Component, onMount, Setter } from "solid-js";

export const CANVAS_SIZE = 28;
export const Canvas: Component<{
	setCanvasRef: Setter<HTMLCanvasElement | null>;
}> = (props) => {
	let canvasRef: HTMLCanvasElement | undefined = undefined;
	let ctx: CanvasRenderingContext2D | null | undefined = undefined;
	let [canvasWidth, canvasHeight] = [0, 0];
	onMount(() => {
		if (canvasRef) {
			props.setCanvasRef(canvasRef);
			const computed = getComputedStyle(canvasRef);
			canvasWidth = parseInt(computed.width);
			canvasHeight = parseInt(computed.height);
		}
		ctx = canvasRef?.getContext("2d");
	});
	let pointerDown = false;
	const handleMove = (e: MouseEvent) => {
		if (!pointerDown) return;
		if (!canvasRef) return;
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
			ref={canvasRef}
		></canvas>
	);
};
