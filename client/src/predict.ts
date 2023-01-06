import * as tf from "@tensorflow/tfjs";

export async function predict() {
	const model = await tf.loadLayersModel(
		location.origin + "/mnist.model/model.json"
	);
	let i = 0;
	const image = new Array(28)
		.fill(0)
		.map(() => new Array(28).fill(0).map(() => i++ % 100));
	const input = tf.tensor([image]);
	const r = model.predict(input);
	return r.toString();
}
