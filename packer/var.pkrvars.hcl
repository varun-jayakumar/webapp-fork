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

env_file = {
  source      = ".env"
  destination = "/tmp/.env"
}

shell_scripts = ["./packer/scripts/install_dependencies.sh", "./packer/scripts/setup_application_directory.sh", "./packer/scripts/setup_user_change_persmissions.sh", "./packer/scripts/create_systemd_file.sh"]

