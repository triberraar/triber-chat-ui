#!/bin/bash
set -ev
if [ ! -z "$TRAVIS_TAG" ]; then 
	docker login -u="$DOCKER_USER" -p="$DOCKER_PASS"
    docker build -t triberraar/triber-chat-ui:latest -t triberraar/triber-chat-ui:$TRAVIS_TAG .
    docker push triberraar/triber-chat-ui
fi