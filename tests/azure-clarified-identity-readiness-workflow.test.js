"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const workflowPath = path.resolve(
  __dirname,
  "..",
  ".github",
  "workflows",
  "azure-clarified-identity-readiness.yml"
);
const workflow = fs.readFileSync(workflowPath, "utf8");

assert.match(workflow, /^on:\n  workflow_dispatch:\s*$/m);
assert.doesNotMatch(workflow, /^\s+(?:push|pull_request|schedule):/m);
assert.match(workflow, /permissions:\n  contents: read/);
assert.match(workflow, /timeout-minutes: 5/);
assert.match(workflow, /AZURE_CORE_OUTPUT: none/);
assert.match(
  workflow,
  /uses: azure\/login@532459ea530d8321f2fb9bb10d1e0bcf23869a43 # v3\.0\.0/
);
assert.match(workflow, /environment: azurecloud/);
assert.match(workflow, /allow-no-subscriptions: false/);

const secretReferences = [...workflow.matchAll(/\$\{\{\s*secrets\.([A-Z0-9_]+)\s*\}\}/g)]
  .map((match) => match[1]);
assert.deepStrictEqual(secretReferences, ["AZURE_CREDENTIALS"]);
assert.match(
  workflow,
  /uses: azure\/login@532459ea530d8321f2fb9bb10d1e0bcf23869a43[\s\S]{0,200}creds: \$\{\{ secrets\.AZURE_CREDENTIALS \}\}/
);
assert.doesNotMatch(workflow, /ACR_LOGIN_SERVER/);

assert.match(workflow, /EXPECTED_AZURE_TENANT_ID: 4d03141f-9141-42e3-a03e-f823c4bbb29d/);
assert.match(workflow, /EXPECTED_AZURE_SUBSCRIPTION_ID: bfed8e7d-30e2-463a-a639-24dc64977dbd/);
assert.match(workflow, /actual_tenant_id[^\n]+az account show[^\n]+--query tenantId[^\n]+--output tsv/);
assert.match(workflow, /actual_subscription_id[^\n]+az account show[^\n]+--query id[^\n]+--output tsv/);
assert.match(workflow, /actual_tenant_id[^\n]+EXPECTED_AZURE_TENANT_ID/);
assert.match(workflow, /actual_subscription_id[^\n]+EXPECTED_AZURE_SUBSCRIPTION_ID/);

const azureCommands = [...workflow.matchAll(/\baz\s+([^\n)]+)/g)].map((match) => match[1].trim());
assert.strictEqual(azureCommands.length, 4);
assert.ok(azureCommands.every((command) => command.startsWith("account show ")));
assert.ok(azureCommands.every((command) => command.includes("--query ")));
assert.doesNotMatch(
  workflow,
  /\baz\s+(?:account set|group|resource|deployment|role|acr|webapp|containerapp|network|keyvault|rest)\b/
);
assert.doesNotMatch(workflow, /azure\/(?:arm-deploy|webapps-deploy)|\bdocker\b|\bkubectl\b|\bterraform\b/i);

assert.match(workflow, /contract_version: "clarified\.azure-identity-readiness\.v1"/);
assert.match(workflow, /azure_mutations_performed: false/);
assert.match(workflow, /credential_material_emitted: false/);
assert.doesNotMatch(workflow, /clientSecret|accessToken|refreshToken|user\.name|subscription_name/i);
assert.match(
  workflow,
  /actions\/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02 # v4\.6\.2/
);

console.log("guarded CLARIFIED Azure identity workflow static validation: PASS");
