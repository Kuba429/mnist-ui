# this is exported notebook
import tensorflow as tf
from keras.datasets import mnist
import tensorflowjs as tfjs

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train = tf.keras.utils.normalize(x_train, axis=1 )
x_test = tf.keras.utils.normalize(x_test, axis=1 )

model = tf.keras.models.Sequential()
model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(units=128, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(units=128, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(units=10, activation=tf.nn.softmax))
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy', metrics=["accuracy"])
model.fit(x_train, y_train, epochs=3)

model.save("mnist.model")

tfjs.converters.save_keras_model(model, "../client/src/assets/mnist.model")


