#!/bin/bash

npm run start-backend &
npm run start-frontend &

# uncomment the command below based on your OS and comment out the others
# for OSX machines
open http://localhost:3000

# for Windows machines
# start http://localhost:3000

# for Linux machines
# xdg-open http://localhost:3000