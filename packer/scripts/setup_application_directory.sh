#!/bin/bash
cd / || exit 1
echo "set_up_application_directory.sh: working directory"
pwd
unzip -d /tmp/ /tmp/webapp.zip
sudo cp -r /tmp/webapp /opt/webapp || exit 1
sudo cp /tmp/.env /opt/webapp/.env || exit 1
