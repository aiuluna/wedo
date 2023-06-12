#!/bin/bash

set -e

BASEDIR=$(dirname $0)
cd BASEDIR/../

yarn global add ts-node
yarn install
yarn global add serve
yarn install-dep --name @wedo/ui
yarn install-link --name @wedo/ui
yarn build --name @wedo/ui
cp -r ./packages/wedo-ui/dist ./
rm -rf ./packages
