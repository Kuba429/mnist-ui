import tensorflow as tf
from keras.datasets import mnist
import numpy
import json
(x_train, y_train), (x_test, y_test) = mnist.load_data()
# x_train = tf.keras.utils.normalize(x_train, axis=1 )
# x_test = tf.keras.utils.normalize(x_test, axis=1 )
new_x_train, new_y_train = [], []
with open("data.json") as f:
    data = json.load(f)
    for i in data:
        raw_rows = json.loads(i["array"]) # list of lists of ints
        new_rows=[] # make the list above into numpy array of arrays of uint8s
        for row in raw_rows:
            new_rows.append(numpy.array(row, dtype="uint8"))
        new_x_train.append(new_rows)
        new_y_train.append(numpy.uint8(i["digit"]))

new_x_train = numpy.array(new_x_train)
new_y_train = numpy.array(new_y_train)
x_train = numpy.array([*x_train, *new_x_train])
y_train = numpy.array([*y_train, *new_y_train])
model = tf.keras.models.Sequential()
model.add(tf.keras.layers.Normalization(axis=1))
model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(units=128, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(units=128, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(units=10, activation=tf.nn.softmax))
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy', metrics=["accuracy"])
model.fit(x_train, y_train, epochs=3)
model.save("mnist.model")
import tensorflowjs as tfjs
tfjs.converters.save_keras_model(model, "../client/src/assets/mnist.model")


