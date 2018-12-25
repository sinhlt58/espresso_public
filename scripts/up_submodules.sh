#!/bin/bash

storm_crawler_version="20ff899c2f808b17cdf43d6fa7f2d54a3c412f06"  #v1.12
CopyCssSelector_version="31cb2f3e02538d17bd9de4b19bfab0b0eed6c754" #v0.5.3

root_dir=$(echo $PWD)/..
libs_dir=$root_dir/libs
libs_spec_dir=$root_dir/libs_spec

if [ "$1" = "install" ]
then
	source $root_dir/../bin/activate
fi

for lib in storm_crawler CopyCssSelector; do
	version=${lib}_version
	version="${!version}"
	if [ "$1" = "apply_patches" ]
	then
		cd $libs_dir/$lib
		echo "Apply patch: "$lib
		git clean -f -d
		git reset --hard $version
		cp -r $libs_spec_dir/$lib $libs_dir	
	fi
	if [ "$1" = "update" ]
	then
		cd $libs_dir/$lib
		echo "Update: "$lib" to "$version
		git clean -f -d
		git reset --hard
		git pull origin master
		git reset --hard $version
	fi
	if [ "$1" = "install" ]
	then
		cd $libs_dir/$lib
		echo "Install: "$lib
		mvn clean package install
	fi
	if [ "$1" = "clean" ]
	then
		cd $libs_dir/$lib
		echo "Clean : "$lib
		git clean -f -d
		git reset --hard $version
	fi
done
