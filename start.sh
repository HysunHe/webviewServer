#!/usr/bin/env bash

docker stop webviewServer
docker rm webviewServer

docker run -d \
    --restart=always \
    --name=webviewServer \
    -p 8892:3001 \
    hysunhe/webviewServer:latest