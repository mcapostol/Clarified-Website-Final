targetScope = 'resourceGroup'

@description('Fixed name of the GitHub Actions deployment identity.')
param managedIdentityName string

@description('Fixed name of the federated identity credential.')
param federatedCredentialName string

@description('Exact GitHub OIDC subject authorized to use the deployment identity.')
param federatedSubject string

@description('Azure region inherited from the dedicated production resource group.')
param location string = resourceGroup().location

var githubOidcIssuer = 'https://token.actions.githubusercontent.com'
var azureAdTokenExchangeAudience = 'api://AzureADTokenExchange'
var contributorRoleDefinitionId = 'b24988ac-6180-42a0-ab88-20f7382dd24c'
var rbacAdministratorRoleDefinitionId = 'f58310d9-a9f6-439a-9e8d-f62e7b41a168'
var contributorRoleDefinitionResourceId = subscriptionResourceId(
  'Microsoft.Authorization/roleDefinitions',
  contributorRoleDefinitionId
)
var rbacAdministratorRoleDefinitionResourceId = subscriptionResourceId(
  'Microsoft.Authorization/roleDefinitions',
  rbacAdministratorRoleDefinitionId
)

resource deploymentIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: managedIdentityName
  location: location
  tags: {
    company: 'clarified'
    product: 'eu-tcp'
    environment: 'production'
    purpose: 'github-oidc-deployment'
  }
}

resource githubEnvironmentFederation 'Microsoft.ManagedIdentity/userAssignedIdentities/federatedIdentityCredentials@2023-01-31' = {
  parent: deploymentIdentity
  name: federatedCredentialName
  properties: {
    issuer: githubOidcIssuer
    subject: federatedSubject
    audiences: [
      azureAdTokenExchangeAudience
    ]
  }
}

// Contributor permits resource deployment, but cannot grant Azure RBAC roles.
resource resourceDeploymentRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, deploymentIdentity.properties.principalId, contributorRoleDefinitionResourceId)
  properties: {
    roleDefinitionId: contributorRoleDefinitionResourceId
    principalId: deploymentIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// RBAC Administrator is narrower than Owner/User Access Administrator for role-assignment deployment.
resource rbacDeploymentRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, deploymentIdentity.properties.principalId, rbacAdministratorRoleDefinitionResourceId)
  properties: {
    roleDefinitionId: rbacAdministratorRoleDefinitionResourceId
    principalId: deploymentIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}
