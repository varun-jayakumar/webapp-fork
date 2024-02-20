#!/bin/bash
cd / || exit 1
echo "set_up_application_directory.sh: working directory"
pwd
cd /opt/ || exit 1
mkdir webapp
ls
unzip -d /opt/webapp/ /tmp/webapp.zip
sudo cp -r /tmp/webapp-main /opt/webapp
sudo cp /tmp/.env /opt/webapp/.env