#!/bin/bash
sudo mkdir -p /var/log/webapp/
sudo touch cd /var/log/webapp/webapp.log
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

sudo chown -R csye6225:csye6225 /var/log/webapp
sudo chmod -R 704 /var/log/webapp

sudo cp /tmp/config.yml /etc/google-cloud-ops-agent/config.yaml
sudo systemctl restart google-cloud-ops-agent"*"
