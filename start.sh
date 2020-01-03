#!/usr/bin/env bash

docker stop webviewserver
docker rm webviewserver

docker run -d \
    --restart=always \
    --name=webviewserver \
    -p 8892:3001 \
    hysunhe/webviewserver:latest