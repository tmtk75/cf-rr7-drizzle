# Configure the Cloudflare provider
provider "cloudflare" {
  # api_token = var.cloudflare_api_token # Set this via environment variable CLOUDFLARE_API_TOKEN
}

# Create a D1 database
resource "cloudflare_d1_database" "production" {
  name       = "rr7-cf-drizzle"
  account_id = var.cloudflare_account_id
}

resource "cloudflare_d1_database" "preview" {
  name       = "rr7-cf-drizzle-preview"
  account_id = var.cloudflare_account_id
}

output "d1" {
  value = {
    production: {
      id: cloudflare_d1_database.production.id
    }
    preview: {
      id: cloudflare_d1_database.preview.id
    }
  }
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID"
  type        = string
  # sensitive   = true  # Uncomment if you want to mark this as sensitive
}

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    #
    # terraform init -backend-config my.tfbackend
    #
    #     $ cat my.tfbackend
    #     profile = "default"
    #     region = "ap-northeast-1"
    #     bucket = "my-terraform-state"
    #
    key = "terraform/cloudflare/rr7-hono-drizzle/terraform.tfstate"
  }
}
