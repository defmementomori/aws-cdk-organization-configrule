import { Construct } from "constructs";
import { aws_config as config } from "aws-cdk-lib";

type ConfigRuleType = {
  ruleIdentifier: string;
  inputParameters?: string;
};

export interface AwsCdkOrganizationConfigruleProps {
  configRulesAll: ConfigRuleType[];
  configRulesOnlyUsEast1: ConfigRuleType[];
  configExcludedAccounts: string[];
}

export class AwsCdkOrganizationConfigrule extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: AwsCdkOrganizationConfigruleProps
  ) {
    super(scope, id);

    const { configRulesAll, configRulesOnlyUsEast1, configExcludedAccounts } =
      props;
    const region = process.env.region;
    const rules =
      region == "us-east-1"
        ? configRulesAll.concat(configRulesOnlyUsEast1)
        : configRulesAll;

    rules.map((rule) => {
      if (rule?.inputParameters) {
        new config.CfnOrganizationConfigRule(
          this,
          `configRule-${rule?.ruleIdentifier}`,
          {
            organizationConfigRuleName: `${rule?.ruleIdentifier}`,
            excludedAccounts: configExcludedAccounts,
            organizationManagedRuleMetadata: {
              ruleIdentifier: rule.ruleIdentifier,
              inputParameters: rule.inputParameters,
            },
          }
        );
      } else {
        new config.CfnOrganizationConfigRule(
          this,
          `configRule-${rule?.ruleIdentifier}`,
          {
            organizationConfigRuleName: `${rule?.ruleIdentifier}`,
            excludedAccounts: configExcludedAccounts,
            organizationManagedRuleMetadata: {
              ruleIdentifier: rule.ruleIdentifier,
            },
          }
        );
      }
    });
  }
}
