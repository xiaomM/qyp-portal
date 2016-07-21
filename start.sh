#!/bin/sh
export NODE_ENV="production"
forever -a -l forever.log start -o out.log -e err.log bin/app.js