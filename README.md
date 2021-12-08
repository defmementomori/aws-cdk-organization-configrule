## Overview

## How to use

```
import { AwsCdkOrganizationConfigrule } from '@defmementomori/aws-cdk-organization-configrule';

// example
new AwsCdkOrganizationConfigrule(this, 'OrgConfig',{
  configRulesAll: [
    { ruleIdentifier: "DYNAMODB_TABLE_ENCRYPTED_KMS" },
    {
      ruleIdentifier: "CW_LOGGROUP_RETENTION_PERIOD_CHECK",
      inputParameters: '{"MinRetentionTime":"1827"}',
    }
  ]

})
```
