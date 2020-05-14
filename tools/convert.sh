#!/bin/bash
for filename in ../public/img/*
do
	if [[ "$filename" =~ \.(png|jpg|jpeg)$ ]] 
	then
	#./bin/cwebp -q 80 ./teste.jpg -o ./teste.webp
	pass=$(echo "$filename" | perl -pe 's/(.+)(\..+)$/$1/g')
	#echo "${pass}.webp"
	./bin/cwebp -q 80 "${filename}" -o "${pass}.webp"
	fi
done
