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
}

build {
  sources = ["sources.googlecompute.vm"]
  provisioner "file" {
  source = "webapp.zip"
  destination = "/tmp/webapp.zip"
  }
  provisioner "shell" {
    inline = ["cd /temp/", "ls"]
}



  // scripts =["./scripts/install_dependencies.sh", "./setup_env.sh", ""]
}
