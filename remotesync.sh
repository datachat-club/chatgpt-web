#!/bin/bash
yarn build-only
#本地开发环境
#测试环境
scp -P 22 -r  ./dist/* fengxian@124.221.123.143:/opt/workspace/chatgpt-web/dist/
##生产环境
#scp -P 32122 -r  dist/*  root@112.124.29.50:/usr/local/nginx/html/vue-gosbyte
