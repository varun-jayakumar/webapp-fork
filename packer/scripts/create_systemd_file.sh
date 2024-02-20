#!/bin/bash
cd /lib/systemd/system || exit 1
sudo bash -c 'cat << 'EOF' > csye6225.service
[Unit]
Description=CSYE 6225 App
ConditionPathExists=/opt/webapp/.env
After=network.target

[Service]
Type=simple
User=csye6225
Group=csye6225
WorkingDirectory=/opt/webapp/
ExecStart=/usr/bin/node -r dotenv/config /opt/webapp/server.js
Restart=always
RestartSec=3
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=csye6225

[Install]
WantedBy=multi-user.target
EOF'

sudo systemctl daemon-reload
sudo systemctl start csye6225.service
sudo systemctl enable csye6225.service 
