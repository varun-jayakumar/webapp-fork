#!/bin/bash
sudo adduser csye6225 --shell /usr/sbin/nologin
cd /tmp/ || exit 1
unzip webapp.zip ./webapp
cp -r /tmp/webapp /home/csye6225
cp /opt/.env /home/csye6225/webapp
cd /home/csye6225/webapp || exit 1
npm i
cd /home/csye6225 || exit 1
chown csye6225:csye6225 webapp



