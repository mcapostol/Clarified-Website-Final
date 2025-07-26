
# Cluster AKS
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-clarified"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "clarifiedaks"

  default_node_pool {
    name       = "agentpool"
    node_count = 2
    vm_size    = "Standard_B2s"
  }

  identity {
    type = "SystemAssigned"
  }
   # Azure AD–based RBAC (noua formă)
  azure_active_directory_role_based_access_control {
  managed = true
  # admin_group_object_ids = ["<AAD-group-object-id>"]
}

  # Păstrează un singur network_profile
  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
  }

  tags = {
    environment = "dev"
  }
}

# Output kubeconfig
output "kube_config" {
  description = "Kubeconfig for AKS"
  value       = azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive   = true
}