variable "vm" {
  type = object({
    project_id   = string
    source_image = string
    ssh_username = string
    zone         = string
    image_name   = string
    image_family = string
  })
}

variable "webapp_file" {
  type = object({
    source      = string
    destination = string
  })
}

variable "systemd_file" {
  type = object({
    source      = string
    destination = string
  })
}

variable "ops_agent_config_file" {
  type = object({
    source      = string
    destination = string
  })
}

variable "shell_scripts" {
  type = list(string)
}


