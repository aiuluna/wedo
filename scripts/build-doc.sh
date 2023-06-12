#!/bin/bash

set -e

BASEDIR=$(dirname $0)
cd BASEDIR/../

yarn global add ts-node
yarn install
yarn install-dep --name @wedo/svc-doc
yarn install-link --name @wedo/svc-doc
yarn build-ts --name @wedo/svc-doc

