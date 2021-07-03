#!/bin/bash

npm i &&
rm -rf out &&
npm run tsc &&
pm2 delete ecosystem.config.js &&
pm2 start ecosystem.config.js
