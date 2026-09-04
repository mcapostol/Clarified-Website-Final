"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repositoryRoot = path.resolve(__dirname, "..");
const workflow = fs.readFileSync(
  path.join(repositoryRoot, ".github/workflows/azure-clarified-oidc-bootstrap.yml"),
  "utf8"
);
const bicep = fs.readFileSync(
  path.join(repositoryRoot, "infrastructure/azure/bootstrap/clarified-eu-tcp-oidc.bicep"),
  "utf8"
);

assert.match(workflow, /^on:\n  workflow_dispatch:\s*$/m);
assert.doesNotMatch(workflow, /^\s+(?:push|pull_request|schedule|workflow_run):/m);
assert.match(workflow, /permissions:\n  contents: read/);
assert.match(workflow, /timeout-minutes: 15/);
assert.match(workflow, /cancel-in-progress: false/);

const actionReferences = [...workflow.matchAll(/^\s+uses:\s+([^\s#]+)/gm)].map((match) => match[1]);
assert.deepStrictEqual(actionReferences, [
  "actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683",
  "azure/login@532459ea530d8321f2fb9bb10d1e0bcf23869a43",
  "actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02"
]);
assert.ok(actionReferences.every((reference) => /@[0-9a-f]{40}$/.test(reference)));

const secretReferences = [...workflow.matchAll(/\$\{\{\s*secrets\.([A-Z0-9_]+)\s*\}\}/g)]
  .map((match) => match[1]);
assert.deepStrictEqual(secretReferences, ["AZURE_CREDENTIALS"]);
assert.match(
  workflow,
  /azure\/login@532459ea530d8321f2fb9bb10d1e0bcf23869a43[\s\S]{0,220}creds: \$\{\{ secrets\.AZURE_CREDENTIALS \}\}/
);
assert.doesNotMatch(workflow, /ACR_LOGIN_SERVER|clientSecret|accessToken|refreshToken/i);

assert.match(workflow, /EXPECTED_AZURE_TENANT_ID: 4d03141f-9141-42e3-a03e-f823c4bbb29d/);
assert.match(workflow, /EXPECTED_AZURE_SUBSCRIPTION_ID: bfed8e7d-30e2-463a-a639-24dc64977dbd/);
assert.match(workflow, /EXPECTED_AZURE_SUBSCRIPTION_NAME: Clarified Main Subscription/);
assert.match(workflow, /TARGET_RESOURCE_GROUP: rg-clarified-eu-tcp-prod-weu/);
assert.match(workflow, /MANAGED_IDENTITY_NAME: id-clarified-eu-tcp-prod-github/);
assert.match(
  workflow,
  /FEDERATED_SUBJECT: repo:mcapostol\/clarified-trade-compliance-demo:environment:azure-production/
);
assert.match(workflow, /forbidden_name_pattern='\(\^\|\[-_\]\)\(pkf\|shared\|common\)\(\[-_\]\|\$\)'/);

const initialGuardIndex = workflow.indexOf("actual_tenant_id actual_subscription_id");
const resourceGroupMutationIndex = workflow.indexOf("az group create");
const deploymentMutationIndex = workflow.indexOf("az deployment group create");
assert.ok(initialGuardIndex > 0);
assert.ok(resourceGroupMutationIndex > initialGuardIndex);
assert.ok(deploymentMutationIndex > resourceGroupMutationIndex);
assert.match(workflow, /actual_tenant_id[\s\S]{0,900}EXPECTED_AZURE_TENANT_ID/);
assert.match(workflow, /actual_subscription_id[\s\S]{0,1200}EXPECTED_AZURE_SUBSCRIPTION_ID/);
assert.match(workflow, /actual_subscription_name[\s\S]{0,1700}EXPECTED_AZURE_SUBSCRIPTION_NAME/);

assert.match(bicep, /^targetScope = 'resourceGroup'$/m);
assert.match(bicep, /Microsoft\.ManagedIdentity\/userAssignedIdentities@2023-01-31/);
assert.match(bicep, /federatedIdentityCredentials@2023-01-31/);
assert.match(bicep, /issuer: githubOidcIssuer/);
assert.match(bicep, /subject: federatedSubject/);
assert.match(bicep, /audiences:\s*\[\s*azureAdTokenExchangeAudience\s*\]/);
assert.match(bicep, /b24988ac-6180-42a0-ab88-20f7382dd24c/);
assert.match(bicep, /f58310d9-a9f6-439a-9e8d-f62e7b41a168/);
assert.strictEqual((bicep.match(/Microsoft\.Authorization\/roleAssignments@2022-04-01/g) || []).length, 2);
assert.match(bicep, /guid\(resourceGroup\(\)\.id,/);
assert.doesNotMatch(bicep, /scope:\s*(?:subscription|managementGroup|tenant)\(/);

assert.match(workflow, /client_id_sha256: sha256\(process\.env\.CLIENT_ID\)/);
assert.match(workflow, /identity_resource_id_sha256: sha256\(process\.env\.IDENTITY_RESOURCE_ID\)/);
assert.match(workflow, /managed_identity_client_id: process\.env\.CLIENT_ID/);
assert.match(workflow, /managed_identity_resource_id: process\.env\.IDENTITY_RESOURCE_ID/);
assert.match(workflow, /credential_material_emitted: false/);
assert.doesNotMatch(workflow, /client_secret|private_key|password:\s*process\.env/i);
assert.match(workflow, /role_scope: "resource-group-only"/);
assert.match(workflow, /az role assignment list[\s\S]{0,180}--assignee "\$principal_id"/);
assert.doesNotMatch(workflow, /--assignee-object-id|--include-inherited false/);

assert.doesNotMatch(
  workflow,
  /\baz\s+(?:acr|containerapp|webapp|staticwebapp|storage|postgres|keyvault|servicebus|cdn|front-door)\b/i
);

console.log("guarded CLARIFIED Azure OIDC bootstrap workflow static validation: PASS");
