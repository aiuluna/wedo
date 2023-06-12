#!/bin/bash

set -e

BASEDIR=$(dirname $0)
cd BASEDIR/../

yarn global add ts-node
yarn install
yarn install-dep --name @wedo/svc-faas
yarn install-link --name @wedo/svc-faas
yarn build-ts --name @wedo/svc-faas

