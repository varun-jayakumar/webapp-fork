#!/bin/bash
sudo adduser csye6225 --shell /usr/sbin/nologin
cd /opt/webapp/ || exit 1
sudo npm i
cd /opt/ || exit 1
sudo chown csye6225:csye6225 webapp



