
container_name="sentiment_image"

docker stop $container_name && docker rm $container_name
echo "Model running with name $container_name stopped and removed"
