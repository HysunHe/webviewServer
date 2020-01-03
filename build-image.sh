#!/usr/bin/env bash

# Building the UI part
TAG=`date '+%Y-%m-%d-%H-%M-%S'`

docker build . -t hysunhe/webviewServer:${TAG}
docker tag hysunhe/webviewServer:${TAG}   hysunhe/webviewServer:latest
