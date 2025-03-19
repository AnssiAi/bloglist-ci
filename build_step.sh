#!/bin/bash

echo "Build script"

cd BlogListFront && npm install
cd ../BlogListApp && npm install
npm run build:frontend