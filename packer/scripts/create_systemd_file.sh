#!/bin/bash
cd /lib/systemd/system || exit 1
cat << 'EOF' > .
[Unit]
Description=CSYE 6225 App
ConditionPathExists=/opt/.env
After=network.target

[Service]
Type=simple
User=csye6225
Group=csye6225
WorkingDirectory=/home/csye6225/webapp/
ExecStart=npm start
Restart=always
RestartSec=3
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=csye6225

[Install]
WantedBy=multi-user.target
EOF