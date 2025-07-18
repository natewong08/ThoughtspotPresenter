#!/bin/bash

npm run start-backend &
npm run start-frontend &

open -a "Google Chrome" http://localhost:3000
