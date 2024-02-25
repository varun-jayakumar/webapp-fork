#!/bin/bash
sudo dnf check-upgrade
# sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
# sudo dnf -qy module disable postgresql
# sudo dnf install -y postgresql14-server
# sudo /usr/pgsql-14/bin/postgresql-14-setup initdb
# sudo systemctl start postgresql-14
# sudo systemctl enable postgresql-14
# sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'mypass';"
sudo dnf module enable nodejs:16 -y
sudo dnf install nodejs -y
node --version
npm --version
sudo dnf install unzip -y


