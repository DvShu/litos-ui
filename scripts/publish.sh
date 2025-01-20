#!/bin/bash

git checkout master

git rebase dev

# npm version patch
# npm version minor
# npm version major

git checkout main -- package.json

git push origin main --tags
