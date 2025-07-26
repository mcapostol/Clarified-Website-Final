terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
  required_version = ">= 1.0.0"
}

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "rg-clarified"
  location = "westeurope"
}

# Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = "clarifiedacr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

# Outputs
output "acr_login_server" {
  description = "Login server URL for the ACR"
  value       = azurerm_container_registry.acr.login_server
}