#!/bin/bash
cd / || exit 1
echo "set_up_application_directory.sh: working directory"
pwd
cd /opt/ || exit 1
sudo mkdir webapp
ls
cd webapp || exit 1
unzip -d /opt/webapp/ /tmp/webapp.zip
ls
sudo cp -r /tmp/webapp-main /opt/webapp
sudo cp /tmp/.env /opt/webapp/.env