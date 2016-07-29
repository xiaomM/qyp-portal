#!/bin/sh
git pull && git fetch
forever stop bin/app.js
./start.sh