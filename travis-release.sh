#!/bin/bash
set -ev
zip -q -r release-$TRAVIS_TAG.zip node_modules dst proxy.js package.json