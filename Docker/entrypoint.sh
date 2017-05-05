#!/bin/bash
cd /tmp

#Clone or pull if exist (auto update on restart container)
if [ -d "Front_Docker_Angular" ]; then 
	cd Front_Docker_Angular
	git pull; 
else 
	git clone https://github.com/EtienneTr/Front_Docker_Angular
	cd Front_Docker_Angular;
fi

npm install
npm start

wait