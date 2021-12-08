## Overview

CDK construct library to deploy config rule for organizations simply.

## Prerequisites

Before using , you should set up for root or audit account enable config rule to organizations.  
for more detail , see [※1]  
[※1]
https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html

CLI command

```
auditAccount="xxxxxxxxx" # only when delegate
aws organizations register-delegated-administrator --account-id ${auditAccount}  --service-principal config.amazonaws.com
aws organizations enable-aws-service-access --service-principal=config-multiaccountsetup.amazonaws.com
aws organizations register-delegated-administrator --service-principal=config-multiaccountsetup.amazonaws.com --account-id ${auditAccount}
```

## How to use

you can specify inputParameters as needed like below example.

```
import { AwsCdkOrganizationConfigrule } from 'aws-cdk-organization-configrule';

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

## Option settings

when deploing to multi region, if you add rule to only us-east-1 , use configRulesOnlyUsEast1 option.

```
new AwsCdkOrganizationConfigrule(this, "OrgConfig", {
  configRulesAll: [
    { ruleIdentifier: "DYNAMODB_TABLE_ENCRYPTED_KMS" },
    {
      ruleIdentifier: "CW_LOGGROUP_RETENTION_PERIOD_CHECK",
      inputParameters: '{"MinRetentionTime":"1827"}',
    },
  ],
  configRulesOnlyUsEast1:[
    { ruleIdentifier: "CLOUDFRONT_ASSOCIATED_WITH_WAF" },
  ]
});
```

when not deploying to specific aws accounts,
use configExcludedAccounts option.

```
    new AwsCdkOrganizationConfigrule(this, "OrgConfig", {
      configRulesAll: [
        { ruleIdentifier: "DYNAMODB_TABLE_ENCRYPTED_KMS" },
        {
          ruleIdentifier: "CW_LOGGROUP_RETENTION_PERIOD_CHECK",
          inputParameters: '{"MinRetentionTime":"1827"}',
        },
      ],
      configRulesOnlyUsEast1:[
        { ruleIdentifier: "CLOUDFRONT_ASSOCIATED_WITH_WAF" },
      ],
      configExcludedAccounts: ["111111111111", "222222222222"]
    });

```

##
