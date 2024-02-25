#!/bin/bash
cd /lib/systemd/system || exit 1
sudo cp /tmp/csye6225.service /usr/lib/systemd/system/csye6225.service
sudo systemctl daemon-reload
sudo systemctl enable csye6225.service 
