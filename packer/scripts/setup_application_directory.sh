#!/bin/bash
cd / || exit 1
echo "set_up_application_directory.sh: working directory"
pwd
cd /opt/ || exit 1
sudo mkdir webapp
ls
cd webapp || exit 1
sudo unzip -d /opt/webapp/ /tmp/webapp.zip
ls