#!/usr/bin/env bash

# Building the UI part
TAG=`date '+%Y-%m-%d-%H-%M-%S'`

docker build . -t hysunhe/webviewserver:${TAG}
docker tag hysunhe/webviewserver:${TAG}   hysunhe/webviewserver:latest
