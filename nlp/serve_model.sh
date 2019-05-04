if [ $# = 0 ]; then 
	folder="1.2.2"
	port=8501
elif [ $# = 1 ]; then
#	if [ $# = 2 ]
	folder=$1
	port=8501
elif [ $# = 2 ]; then
	folder=$1
	port=$2
fi

bash_location=$(realpath $(dirname "$0") )
model_location="$bash_location/model/$folder/export"
container_name="sentiment_image"

docker run --restart always --name $container_name -p 8501:$port --mount type=bind,source=$model_location,target=/models/predict_score -e MODEL_NAME=predict_score -t tensorflow/serving 2>&1 > /dev/null &

echo "Docker is running a model at $model_location with container name $container_name"
