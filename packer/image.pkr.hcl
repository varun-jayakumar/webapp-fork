packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "vm" {
  project_id   = "cloudspring2024-dev"
  source_image = "centos-stream-8-v20240110"
  ssh_username = "centOs"
  zone         = "us-central1-a"
  image_name   = "webapp-image-{{timestamp}}"
}

build {
  sources = ["sources.googlecompute.vm"]
  provisioner "file"{
    source      = "webapp.zip"
    destination = "/tmp/webapp.zip"
  }
  provisioner "file"{
    source      = "../.env"
    destination = "/tmp/.env"
  }
  provisioner "shell" {
    scripts = ["./scripts/install_dependencies.sh","./scripts/setup_application_directory.sh", "./scripts/setup_user_change_persmissions.sh", "./scripts/create_systemd_file.sh"]
  }



  // scripts =["./scripts/install_dependencies.sh", "./setup_env.sh", ""]
}
