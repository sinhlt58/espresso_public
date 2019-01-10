if [ $# = 0 ]; then 
	port=8501
else
	port=$1
fi

bash_location=$(pwd)
model_location="$bash_location/model/default/export"
container_name="sentiment_image"


docker run --name $container_name -p 8501:$port --mount type=bind,source=$model_location,target=/models/predict_score -e MODEL_NAME=predict_score -t tensorflow/serving &

echo "Docker is running a model at $model_location with container name $container_name"
