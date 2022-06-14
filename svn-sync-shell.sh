#!/usr/bin/env sh

if [ -z "$1" ]; then
    echo "Please provide a target directory."
    exit 1
fi

files=`git ls-files`

for file in $files; do
    mkdir -p "$1/${file%/*}"
    touch "$1/$file"
    cp $file $1/$file
done
