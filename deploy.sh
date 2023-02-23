#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

git add dist && git commit -m 'adding dist subtree'
git push origin :gh-pages && git subtree push --prefix dist origin gh-pages

cd -