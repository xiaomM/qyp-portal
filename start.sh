#!/bin/sh
forever -a -l forever.log start -o out.log -e err.log bin/app.js