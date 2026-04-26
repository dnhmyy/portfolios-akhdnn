#!/usr/bin/env bash
set -eu

rm -rf dist
mkdir -p dist

cp index.html dist/
cp robots.txt dist/
cp _headers dist/
cp _redirects dist/
cp -R css dist/
cp -R js dist/
cp -R webfonts dist/
cp -R website-portfolio dist/
