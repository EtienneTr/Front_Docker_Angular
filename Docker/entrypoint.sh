#!/bin/bash
cd /tmp

#Clone or pull if exist (auto update on restart container)
if cd Front_Docker_Angular; then git pull; else git clone https://github.com/EtienneTr/Front_Docker_Angular; fi

cd Front_Docker_Angular
npm install
npm start