import * as tf from "@tensorflow/tfjs";

export async function predict(image: number[][]) {
	const model = await tf.loadLayersModel(
		location.origin + "/mnist.model/model.json"
	);
	const input = tf.tensor([image]);
	input.print();
	const r = model.predict(input) as any; // tfjs types suck idk

	return (r.dataSync() as number[]).reduce(
		(acc, val, idx) => (val > acc.val ? { idx, val } : acc),
		{
			idx: 0,
			val: -Infinity,
		}
	).idx;
}
//
//export async function predict(canvas: HTMLCanvasElement) {
//	const imageData = canvas
//		.getContext("2d")!
//		.getImageData(0, 0, canvas.width, canvas.height);
//
//	let img = tf.browser.fromPixels(imageData, 1).reshape([1, 28, 28]);
//	img = tf.cast(img, "float32");
//	const model = await tf.loadLayersModel(
//		location.origin + "/mnist.model/model.json"
//	);
//	const res = model.predict(img);
//	console.log(res);
//	console.table(await res.data());
//}
