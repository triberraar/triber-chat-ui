# Triber-chat ui [![Travis build status](https://img.shields.io/travis/triberraar/triber-chat-ui/develop.svg)](https://travis-ci.org/triberraar/triber-chat-ui)
This is the frontend project related to [triber-chat](https://github.com/triberraar/triber-chat). It is written in javascript using the Angular 1.5 framework.

[![bitHound Overalll Score](https://www.bithound.io/github/triberraar/triber-chat-ui/badges/score.svg?style=flat-square)](https://www.bithound.io/github/triberraar/triber-chat-ui)
[![Coveralls test coverage](https://img.shields.io/coveralls/triberraar/triber-chat-ui/develop.svg)](https://coveralls.io/github/triberraar/triber-chat-ui?branch=develop)
[![bitHound Code](https://www.bithound.io/github/triberraar/triber-chat-ui/badges/code.svg?style=flat-square)](https://www.bithound.io/github/triberraar/triber-chat-ui)
[![bitHound Dependencies](https://www.bithound.io/github/triberraar/triber-chat-ui/badges/dependencies.svg?style=flat-square)](https://www.bithound.io/github/triberraar/triber-chat-ui/develop/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/triberraar/triber-chat-ui/badges/devDependencies.svg?style=flat-square)](https://www.bithound.io/github/triberraar/triber-chat-ui/develop/dependencies/npm)

## How to run
### Straigth with node
A proxy script is provided and npm scripts are supplied to run it. Run the proxy script through node or the npm script.
### With Docker
A Dockerfile is also supplied, run with docker. For a docker compose file have a look at the [triber-chat](https://github.com/triberraar/triber-chat) repository.

## Configuration
The following environment variables can be used to configure the application. They can be passed to Docker and the node script:
* PROXY_HOST: The host where triber-chat is running.
* PROXY_PORT: The port where triber-chat is running.
* PORT: The port where this proxy script is listening on.