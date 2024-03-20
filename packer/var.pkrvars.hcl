vm = {
  project_id   = "cloudspring2024-dev-415217",
  source_image = "centos-stream-8-v20240110"
  ssh_username = "centOs"
  zone         = "us-central1-a"
  image_name   = "webapp-image-{{timestamp}}"
  image_family = "csye6225"
}

webapp_file = {
  source      = "webapp.zip"
  destination = "/tmp/webapp.zip"
}

systemd_file = {
  source      = "./packer/config_files/csye6225.service"
  destination = "/tmp/csye6225.service"
}

ops_agent_config_file = {
  source      = "./packer/config_files/config.yaml"
  destination = "/tmp/config.yml"
}

shell_scripts = ["./packer/scripts/install_dependencies.sh", "./packer/scripts/setup_application_directory.sh", "./packer/scripts/setup_user_change_persmissions.sh", "./packer/scripts/create_systemd_file.sh", "./packer/scripts/packer/scripts/install_ops_agent.sh"]

