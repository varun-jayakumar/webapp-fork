#!/bin/bash
cat << 'EOF' > /opt/.env 
"DB_USERNAME="postgres"
DB_NAME="myapp"
DB_PASSWORD="mypass"
DB_PORT=5432
PORT=3000"
EOF