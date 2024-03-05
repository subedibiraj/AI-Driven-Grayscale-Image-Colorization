import os
import matplotlib.pyplot as plt
from skimage.color import rgb2lab, lab2rgb
from skimage.transform import resize
import numpy as np
import tensorflow as tf
import time
from utilities import process
from utilities import DataGenerator
from skimage.io import imread
from tensorflow.keras.applications import InceptionResNetV2
from tensorflow.keras.optimizers import Adam
from skimage.color import rgb2lab, lab2rgb, rgb2gray, gray2rgb

# Get the absolute path to the directory containing the Python script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the model file
model_file = os.path.join(script_dir, 'final_model')

# Load the model using the absolute path
Final_model = tf.keras.models.load_model(model_file)

# Get the absolute path to the 'uploads' and 'processed' directories within the 'backend' directory
uploads_dir = os.path.join(os.path.dirname(__file__), '..', 'uploads')
processed_dir = os.path.join(os.path.dirname(__file__), '..', 'processed')

# Specify the path to the single image
image_filename = 'gray.jpg'
image_path = os.path.join(uploads_dir, image_filename)

# Wait until the 'gray.jpg' image exists in the uploads directory
while not os.path.exists(image_path):
    time.sleep(1)

# Function to predict and visualize colorized images
def predict(image_path):
    predict_image_rgb = np.array((imread(image_path)))
    Encoder_image, Extractor_image, AB_channel = process(predict_image_rgb)

    fig = plt.figure(figsize=(20, 10))

    BW_image = rgb2gray(predict_image_rgb)
    
    Encoder_image = Encoder_image.reshape((1, 224, 224, 1))
    Extractor_image = Extractor_image.reshape((1, 299, 299, 3))
    
    predicted = Final_model.predict([[Encoder_image], [Extractor_image]])
    
    Encoder_image = Encoder_image * 50
    Encoder_image = Encoder_image + 50
    predicted = predicted * 128
    
    Final_predicted_image = np.concatenate((Encoder_image, predicted), axis=-1)
    Final_predicted_image = lab2rgb(Final_predicted_image[0])
    Final_predicted_image = resize(Final_predicted_image, (predict_image_rgb.shape[0], predict_image_rgb.shape[1], 3), anti_aliasing=True)

    ax = fig.add_subplot(1, 3, 1)
    ax.set_title('Input image')
    ax.imshow(BW_image, cmap='gray')
    ax.axis('off')

    ax = fig.add_subplot(1, 3, 2)
    ax.set_title('Predicted image')
    ax.imshow(Final_predicted_image)
    ax.axis('off')

    ax = fig.add_subplot(1, 3, 3)
    ax.set_title('Ground Truth')
    ax.axis('off')
    ax.imshow(predict_image_rgb)
    
    return Final_predicted_image 

result_rgb = predict(image_path)

colored_image_path = os.path.join(processed_dir, 'colored_' + image_filename)
plt.imsave(colored_image_path, result_rgb)

del_image_filename = "colored_gray.jpg"
absolute_file_path = os.path.join(processed_dir, del_image_filename)
time.sleep(5)
os.remove(absolute_file_path)
os.remove(image_path)
