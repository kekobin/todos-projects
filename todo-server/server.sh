#!/bin/bash
# killall -9 node
echo $1

if [ $1 == "start" ]; then
    forever start ./bin/www
else
    forever stop ./bin/www
fi
