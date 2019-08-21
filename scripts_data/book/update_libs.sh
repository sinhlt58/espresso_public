
#!/bin/bash

root_dir=$(echo $PWD)
libs_dir=$root_dir/node_modules
libs_spec_dir=$root_dir/lib_spec

for lib in mathjax-node-page mathjax-node-svg2png; do
    cd $libs_dir/$lib
    echo "Apply patch: "$lib
    cp -r $libs_spec_dir/$lib $libs_dir
    npm i
done
