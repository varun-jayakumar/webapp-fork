packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "vm" {
  project_id   = var.vm.project_id
  source_image = var.vm.source_image
  ssh_username = var.vm.ssh_username
  zone         = var.vm.zone
  image_name   = var.vm.image_name
  image_family = var.vm.image_family
}

build {
  sources = ["sources.googlecompute.vm"]
  provisioner "file" {
    source      = var.webapp_file.source
    destination = var.webapp_file.destination
  }
  provisioner "file" {
    source      = var.systemd_file.source
    destination = var.systemd_file.destination
  }

  provisioner "file" {
    source      = var.ops_agent_config_file.source
    destination = var.ops_agent_config_file.destination
  }

  provisioner "shell" {
    scripts = var.shell_scripts
  }



  // scripts =["./scripts/install_dependencies.sh", "./setup_env.sh", ""]
}
