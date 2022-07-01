# importing libraries
from turtle import color
import matplotlib.pyplot as plt
import os
import sys

dirname = os.path.dirname(__file__)

def draw(arg_x, arg_y, x_name, y_name):

	# 4 quarants config
	roc_t = 0
	roc_v = 0

	T_Cutoff = roc_t
	V_Cutoff = roc_v

	fig, ax = plt.subplots(figsize=(5,5))
	ax.set_xlim(-40,40)
	ax.set_ylim(-40,40)


	ax.axvline(T_Cutoff,color = 'black',linestyle='dashed',lw=2)
	ax.axhline(V_Cutoff,color = 'black',linestyle='dashed',lw=2)

	ax.fill_between([-40, roc_t],-40,roc_v,alpha=0.3, color='green')  # green
	ax.fill_between([roc_t, 40], -40, roc_v, alpha=0.3, color='yellow')  # yellow
	ax.fill_between([-40, roc_t], roc_v, 40, alpha=0.3, color='red')  # red
	ax.fill_between([roc_t, 40], roc_v, 40, alpha=0.3, color='blue')  # blue

	#set limit for x-axis and y-axis
	plt.xlim(-40,40)
	plt.ylim(-40,40)

	# creating two array for plotting
	x = [arg_x]
	y = [arg_y]

	# creating scatter plot with both negative
	# and positive axes
	plt.scatter(x, y, color = "red", s=100)

	#get current axes
	ax = plt.gca()

	#hide y-axis
	ax.get_yaxis().set_visible(False)

	#hide x-axis
	ax.get_xaxis().set_visible(False)

	# adding vertical line in data co-ordinates
	plt.axvline(0, c='black', ls='--')

	# adding horizontal line in data co-ordinates
	plt.axhline(0, c='black', ls='--')

	# config the directory path to save images and each image name 

	image_name = x_name + ',' + y_name + '.png'
	filename = os.path.join(dirname, 'images', image_name)

	plt.axis('off')
	# save the figure
	plt.savefig(filename, bbox_inches='tight', pad_inches = 0)

draw(arg_x = float(sys.argv[1]), arg_y = float(sys.argv[2]), x_name = str(sys.argv[3]), y_name = str(sys.argv[4]))
