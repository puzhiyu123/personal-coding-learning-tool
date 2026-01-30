import type { QuizDrill } from "./quiz-drills";

export const awsQuizDrills: QuizDrill[] = [
  // ─── IAM ───────────────────────────────────────────────────────────────
  {
    id: "quiz-aws-iam-01",
    trackId: "aws",
    category: "IAM",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "In an IAM policy document, the ____ field specifies which AWS resources the policy applies to.",
    options: [
      { label: "A", text: "Resource" },
      { label: "B", text: "Action" },
      { label: "C", text: "Effect" },
      { label: "D", text: "Principal" },
    ],
    correctAnswer: "A",
    explanation:
      "The `Resource` field in an IAM policy uses ARNs to specify which AWS resources the statement covers. `Action` defines what operations are allowed or denied, while `Effect` is either Allow or Deny.",
    hint: "This field uses ARN values like `arn:aws:s3:::my-bucket/*`.",
    tags: ["iam", "policies", "security"],
  },
  {
    id: "quiz-aws-iam-02",
    trackId: "aws",
    category: "IAM",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which IAM entity should you attach to an EC2 instance so it can access other AWS services without embedding credentials?",
    options: [
      { label: "A", text: "IAM user with access keys" },
      { label: "B", text: "IAM role with an instance profile" },
      { label: "C", text: "IAM group with inline policies" },
      { label: "D", text: "Root account credentials stored in environment variables" },
    ],
    correctAnswer: "B",
    explanation:
      "IAM roles with instance profiles provide temporary credentials that are automatically rotated, eliminating the need to store long-term access keys on instances.",
    hint: "Think about which entity provides temporary, automatically-rotated credentials.",
    tags: ["iam", "roles", "ec2", "security"],
  },
  {
    id: "quiz-aws-iam-03",
    trackId: "aws",
    category: "IAM",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What will this AWS CLI command return for a newly created IAM user with no policies attached?",
    codeSnippet: `aws iam list-attached-user-policies --user-name new-developer`,
    options: [
      { label: "A", text: "An error because the user does not exist" },
      { label: "B", text: '`{ "AttachedPolicies": [] }`' },
      { label: "C", text: "A list containing the default `IAMReadOnlyAccess` policy" },
      { label: "D", text: '`{ "Policies": [] }`' },
    ],
    correctAnswer: "B",
    explanation:
      "New IAM users have no permissions by default. The command returns an empty `AttachedPolicies` array. Note the key name is `AttachedPolicies`, not `Policies`.",
    hint: "IAM follows the principle of least privilege -- new users start with zero permissions.",
    tags: ["iam", "users", "cli"],
  },
  {
    id: "quiz-aws-iam-04",
    trackId: "aws",
    category: "IAM",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "An IAM policy has an explicit `Deny` on `s3:PutObject` and another policy attached to the same user has an explicit `Allow` on `s3:*`. What happens when the user tries to upload an object to S3?",
    options: [
      { label: "A", text: "The request is allowed because `s3:*` includes `s3:PutObject`" },
      { label: "B", text: "The request is denied because explicit Deny always overrides Allow" },
      { label: "C", text: "The request triggers an MFA prompt" },
      { label: "D", text: "The result depends on which policy was attached first" },
    ],
    correctAnswer: "B",
    explanation:
      "In IAM policy evaluation, an explicit Deny always takes precedence over any Allow. This is a fundamental rule of AWS policy evaluation logic.",
    hint: "Consider the IAM policy evaluation order: explicit Deny, explicit Allow, implicit Deny.",
    tags: ["iam", "policies", "security", "evaluation-logic"],
  },

  // ─── S3 ────────────────────────────────────────────────────────────────
  {
    id: "quiz-aws-s3-01",
    trackId: "aws",
    category: "S3",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "S3 bucket names must be globally ____ across all AWS accounts and regions.",
    options: [
      { label: "A", text: "unique" },
      { label: "B", text: "encrypted" },
      { label: "C", text: "replicated" },
      { label: "D", text: "versioned" },
    ],
    correctAnswer: "A",
    explanation:
      "S3 bucket names exist in a global namespace, meaning no two buckets in the entire AWS ecosystem can share the same name, regardless of account or region.",
    hint: "Think about what it means for a bucket to have a DNS-compatible name.",
    tags: ["s3", "buckets", "naming"],
  },
  {
    id: "quiz-aws-s3-02",
    trackId: "aws",
    category: "S3",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "A bucket has versioning enabled. You upload `report.pdf`, then upload a new version of `report.pdf`, then delete `report.pdf`. What does `aws s3 ls s3://my-bucket/` show?",
    options: [
      { label: "A", text: "Both versions of `report.pdf`" },
      { label: "B", text: "Only the latest version of `report.pdf`" },
      { label: "C", text: "No objects (empty output)" },
      { label: "D", text: "An error because the object was deleted" },
    ],
    correctAnswer: "C",
    explanation:
      "When you delete an object in a versioned bucket, S3 inserts a delete marker. The standard `ls` command does not show deleted objects. The previous versions still exist but require `--include-versions` via the API to see.",
    hint: "The standard `ls` command shows current objects, not delete markers.",
    tags: ["s3", "versioning", "cli"],
  },
  {
    id: "quiz-aws-s3-03",
    trackId: "aws",
    category: "S3",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "To automatically move objects to a cheaper storage class after 30 days, you configure an S3 ____ rule.",
    options: [
      { label: "A", text: "Lifecycle" },
      { label: "B", text: "Replication" },
      { label: "C", text: "Inventory" },
      { label: "D", text: "Analytics" },
    ],
    correctAnswer: "A",
    explanation:
      "S3 Lifecycle rules let you define transitions (e.g., Standard to Glacier after 30 days) and expirations to manage storage costs automatically.",
    hint: "This feature manages the object's journey from creation to deletion.",
    tags: ["s3", "lifecycle", "storage-classes"],
  },
  {
    id: "quiz-aws-s3-04",
    trackId: "aws",
    category: "S3",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "Which S3 feature should you enable to allow a web application hosted on `https://app.example.com` to make `PUT` requests to your S3 bucket via the browser?",
    options: [
      { label: "A", text: "S3 Transfer Acceleration" },
      { label: "B", text: "Cross-Origin Resource Sharing (CORS) configuration" },
      { label: "C", text: "S3 Object Lock" },
      { label: "D", text: "Server-side encryption with KMS" },
    ],
    correctAnswer: "B",
    explanation:
      "CORS configuration on the S3 bucket allows browsers to make cross-origin requests. Without it, the browser's same-origin policy blocks requests from a different domain.",
    hint: "Browsers enforce a security policy that restricts requests to different origins.",
    tags: ["s3", "cors", "web", "security"],
  },

  // ─── Lambda ────────────────────────────────────────────────────────────
  {
    id: "quiz-aws-lambda-01",
    trackId: "aws",
    category: "Lambda",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "The maximum execution timeout for a single AWS Lambda invocation is ____ minutes.",
    options: [
      { label: "A", text: "5" },
      { label: "B", text: "10" },
      { label: "C", text: "15" },
      { label: "D", text: "30" },
    ],
    correctAnswer: "C",
    explanation:
      "AWS Lambda functions can run for a maximum of 15 minutes (900 seconds). For longer workloads, consider Step Functions or AWS Batch.",
    hint: "The limit is measured in seconds and equals 900.",
    tags: ["lambda", "limits", "configuration"],
  },
  {
    id: "quiz-aws-lambda-02",
    trackId: "aws",
    category: "Lambda",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "Given this Lambda handler, what is returned when the function is invoked with the event `{ \"name\": \"Cloud\" }`?",
    codeSnippet: `exports.handler = async (event) => {
  const greeting = \`Hello, \${event.name || "World"}!\`;
  return {
    statusCode: 200,
    body: JSON.stringify({ message: greeting }),
  };
};`,
    options: [
      { label: "A", text: '`{ "statusCode": 200, "body": "{\\\"message\\\":\\\"Hello, Cloud!\\\"}" }`' },
      { label: "B", text: '`{ "message": "Hello, Cloud!" }`' },
      { label: "C", text: '`"Hello, Cloud!"`' },
      { label: "D", text: "An error because `event.name` is undefined" },
    ],
    correctAnswer: "A",
    explanation:
      "The handler returns the full response object including `statusCode` and a stringified `body`. This is the standard format expected by API Gateway integration.",
    hint: "Lambda returns exactly what the handler function returns, including the wrapper object.",
    tags: ["lambda", "handlers", "nodejs"],
  },
  {
    id: "quiz-aws-lambda-03",
    trackId: "aws",
    category: "Lambda",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "Which strategy is most effective for reducing AWS Lambda cold start latency in a production environment?",
    options: [
      { label: "A", text: "Increase the function timeout to 15 minutes" },
      { label: "B", text: "Use Provisioned Concurrency to keep instances warm" },
      { label: "C", text: "Increase the memory allocation to 10 GB" },
      { label: "D", text: "Deploy the function in every AWS region" },
    ],
    correctAnswer: "B",
    explanation:
      "Provisioned Concurrency keeps a specified number of Lambda instances initialized and ready, eliminating cold starts for those instances. Increasing memory can help execution speed but does not prevent cold starts.",
    hint: "This feature pre-initializes execution environments before invocations arrive.",
    tags: ["lambda", "cold-starts", "performance"],
  },
  {
    id: "quiz-aws-lambda-04",
    trackId: "aws",
    category: "Lambda",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Lambda functions can be triggered by events from services like S3, DynamoDB Streams, and ____.",
    options: [
      { label: "A", text: "Amazon SQS" },
      { label: "B", text: "Amazon RDS table inserts" },
      { label: "C", text: "AWS Config file changes" },
      { label: "D", text: "Amazon Redshift queries" },
    ],
    correctAnswer: "A",
    explanation:
      "Amazon SQS is a supported event source for Lambda. Lambda polls the queue and invokes the function with batches of messages. RDS and Redshift are not direct Lambda event sources.",
    hint: "This is a fully managed message queuing service.",
    tags: ["lambda", "triggers", "sqs"],
  },

  // ─── EC2 ───────────────────────────────────────────────────────────────
  {
    id: "quiz-aws-ec2-01",
    trackId: "aws",
    category: "EC2",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which EC2 instance purchasing option provides the largest discount in exchange for a 1- or 3-year commitment?",
    options: [
      { label: "A", text: "On-Demand Instances" },
      { label: "B", text: "Spot Instances" },
      { label: "C", text: "Reserved Instances (or Savings Plans)" },
      { label: "D", text: "Dedicated Hosts" },
    ],
    correctAnswer: "C",
    explanation:
      "Reserved Instances and Savings Plans offer up to 72% discount compared to On-Demand pricing in exchange for a commitment. Spot Instances can be cheaper but can be interrupted.",
    hint: "This option requires a long-term commitment but guarantees capacity.",
    tags: ["ec2", "pricing", "reserved"],
  },
  {
    id: "quiz-aws-ec2-02",
    trackId: "aws",
    category: "EC2",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What does the following security group configuration allow?",
    codeSnippet: `Type: Inbound
Protocol: TCP
Port Range: 443
Source: 0.0.0.0/0

Type: Inbound
Protocol: TCP
Port Range: 22
Source: 10.0.0.0/8`,
    options: [
      { label: "A", text: "HTTPS from anywhere, SSH from the private network only" },
      { label: "B", text: "HTTPS and SSH from anywhere" },
      { label: "C", text: "All TCP traffic from the private network" },
      { label: "D", text: "HTTPS from the private network, SSH from anywhere" },
    ],
    correctAnswer: "A",
    explanation:
      "Port 443 (HTTPS) is open to `0.0.0.0/0` (all IPs), while port 22 (SSH) is restricted to `10.0.0.0/8`, which is the private IP range. This is a common secure pattern.",
    hint: "`0.0.0.0/0` means all IP addresses; `10.0.0.0/8` is a private range.",
    tags: ["ec2", "security-groups", "networking"],
  },
  {
    id: "quiz-aws-ec2-03",
    trackId: "aws",
    category: "EC2",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "EC2 security groups are ____, meaning if you allow inbound traffic, the response traffic is automatically allowed outbound.",
    options: [
      { label: "A", text: "stateful" },
      { label: "B", text: "stateless" },
      { label: "C", text: "bidirectional" },
      { label: "D", text: "symmetric" },
    ],
    correctAnswer: "A",
    explanation:
      "Security groups are stateful: they automatically allow return traffic regardless of outbound rules. NACLs, in contrast, are stateless and require explicit inbound and outbound rules.",
    hint: "Compare this behavior with NACLs, which require rules in both directions.",
    tags: ["ec2", "security-groups", "networking"],
  },

  // ─── DynamoDB ──────────────────────────────────────────────────────────
  {
    id: "quiz-aws-dynamodb-01",
    trackId: "aws",
    category: "DynamoDB",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "Every DynamoDB table requires a ____ key, which uniquely identifies each item in the table.",
    options: [
      { label: "A", text: "Primary" },
      { label: "B", text: "Foreign" },
      { label: "C", text: "Secondary" },
      { label: "D", text: "Composite" },
    ],
    correctAnswer: "A",
    explanation:
      "A primary key uniquely identifies each item. It can be a simple partition key or a composite key (partition key + sort key). DynamoDB does not use foreign keys.",
    hint: "This key is mandatory when creating a table and ensures each item is uniquely addressable.",
    tags: ["dynamodb", "keys", "table-design"],
  },
  {
    id: "quiz-aws-dynamodb-02",
    trackId: "aws",
    category: "DynamoDB",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "Given a DynamoDB table with partition key `PK` and sort key `SK`, what does this query return?",
    codeSnippet: `aws dynamodb query \\
  --table-name Orders \\
  --key-condition-expression "PK = :pk AND begins_with(SK, :prefix)" \\
  --expression-attribute-values '{
    ":pk": {"S": "USER#123"},
    ":prefix": {"S": "ORDER#2024"}
  }'`,
    options: [
      { label: "A", text: "All items for USER#123 with sort keys starting with ORDER#2024" },
      { label: "B", text: "All items in the table that contain ORDER#2024" },
      { label: "C", text: "Only the first item matching the key condition" },
      { label: "D", text: "An error because `begins_with` is not allowed on sort keys" },
    ],
    correctAnswer: "A",
    explanation:
      "The query retrieves all items with `PK = USER#123` whose sort key starts with `ORDER#2024`. The `begins_with` function is valid on sort keys in key condition expressions.",
    hint: "`begins_with` is a supported function for sort key conditions in DynamoDB queries.",
    tags: ["dynamodb", "queries", "key-conditions"],
  },
  {
    id: "quiz-aws-dynamodb-03",
    trackId: "aws",
    category: "DynamoDB",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "You need to query a DynamoDB table by a non-key attribute called `email`. The table has `userId` as the partition key. What is the best approach?",
    options: [
      { label: "A", text: "Use `Scan` with a `FilterExpression` on `email`" },
      { label: "B", text: "Create a Global Secondary Index (GSI) with `email` as the partition key" },
      { label: "C", text: "Change the table's partition key to `email`" },
      { label: "D", text: "Use `BatchGetItem` with all known email values" },
    ],
    correctAnswer: "B",
    explanation:
      "A GSI lets you query by an alternate key. Scanning reads every item in the table and is inefficient for large tables. Changing the primary key requires recreating the table.",
    hint: "This feature creates an alternate key schema for efficient queries on non-key attributes.",
    tags: ["dynamodb", "gsi", "indexes", "query-patterns"],
  },
  {
    id: "quiz-aws-dynamodb-04",
    trackId: "aws",
    category: "DynamoDB",
    difficulty: "intermediate",
    type: "fill-in-blank",
    question:
      "DynamoDB supports two read consistency models: eventually consistent reads and ____ consistent reads.",
    options: [
      { label: "A", text: "strongly" },
      { label: "B", text: "immediately" },
      { label: "C", text: "transactionally" },
      { label: "D", text: "causally" },
    ],
    correctAnswer: "A",
    explanation:
      "Strongly consistent reads return the most up-to-date data but cost twice as many read capacity units. Eventually consistent reads may return slightly stale data but are cheaper.",
    hint: "This read mode costs double the read capacity units but guarantees the latest data.",
    tags: ["dynamodb", "consistency", "reads"],
  },

  // ─── API Gateway ───────────────────────────────────────────────────────
  {
    id: "quiz-aws-apigateway-01",
    trackId: "aws",
    category: "API Gateway",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "Which API Gateway type is optimized for low-latency, cost-effective HTTP APIs and supports Lambda proxy integration?",
    options: [
      { label: "A", text: "REST API" },
      { label: "B", text: "HTTP API" },
      { label: "C", text: "WebSocket API" },
      { label: "D", text: "GraphQL API" },
    ],
    correctAnswer: "B",
    explanation:
      "HTTP APIs are designed for low-latency use cases, support Lambda proxy integration, and are up to 71% cheaper than REST APIs. They lack some REST API features like request validation and caching.",
    hint: "This API type was introduced as a cheaper, faster alternative to the original REST API offering.",
    tags: ["api-gateway", "http-api", "lambda"],
  },
  {
    id: "quiz-aws-apigateway-02",
    trackId: "aws",
    category: "API Gateway",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "API Gateway can use ____ authorizers to validate bearer tokens, such as JWTs, before routing requests to backend services.",
    options: [
      { label: "A", text: "Lambda" },
      { label: "B", text: "IAM policy" },
      { label: "C", text: "S3 bucket" },
      { label: "D", text: "CloudFront" },
    ],
    correctAnswer: "A",
    explanation:
      "Lambda authorizers (formerly custom authorizers) let you implement token validation logic in a Lambda function. API Gateway also supports Cognito user pool authorizers and IAM authorization.",
    hint: "This authorizer type runs your own serverless code to validate tokens.",
    tags: ["api-gateway", "authorization", "lambda"],
  },

  // ─── CloudFormation / CDK ──────────────────────────────────────────────
  {
    id: "quiz-aws-cloudformation-01",
    trackId: "aws",
    category: "CloudFormation",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What resource does this CloudFormation snippet create?",
    codeSnippet: `Resources:
  MyFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: my-api-handler
      Runtime: nodejs20.x
      Handler: index.handler
      Code:
        S3Bucket: my-deployment-bucket
        S3Key: lambda/handler.zip
      MemorySize: 256
      Timeout: 30`,
    options: [
      { label: "A", text: "A Lambda function named `my-api-handler` with 256 MB memory and 30s timeout" },
      { label: "B", text: "An EC2 instance running Node.js 20" },
      { label: "C", text: "An ECS task definition with 256 CPU units" },
      { label: "D", text: "A Lambda layer containing the handler code" },
    ],
    correctAnswer: "A",
    explanation:
      "The `AWS::Lambda::Function` type creates a Lambda function. The properties set its name, runtime, handler entry point, code location in S3, memory (256 MB), and timeout (30 seconds).",
    hint: "Look at the `Type` field to identify the AWS resource being created.",
    tags: ["cloudformation", "lambda", "infrastructure-as-code"],
  },
  {
    id: "quiz-aws-cloudformation-02",
    trackId: "aws",
    category: "CloudFormation",
    difficulty: "advanced",
    type: "fill-in-blank",
    question:
      "In CloudFormation, the `!____` intrinsic function retrieves the value of an attribute from a resource in the same template.",
    options: [
      { label: "A", text: "GetAtt" },
      { label: "B", text: "Ref" },
      { label: "C", text: "Sub" },
      { label: "D", text: "FindInMap" },
    ],
    correctAnswer: "A",
    explanation:
      "`!GetAtt` returns an attribute of a resource (e.g., `!GetAtt MyBucket.Arn`). `!Ref` returns the resource ID or parameter value, not specific attributes.",
    hint: "You would use this to get a resource's ARN, domain name, or other specific attribute.",
    tags: ["cloudformation", "intrinsic-functions", "iac"],
  },
  {
    id: "quiz-aws-cloudformation-03",
    trackId: "aws",
    category: "CloudFormation",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What will `!Sub` produce given this CloudFormation snippet?",
    codeSnippet: `Parameters:
  Environment:
    Type: String
    Default: prod

Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub "\${Environment}-data-\${AWS::AccountId}"`,
    options: [
      { label: "A", text: "`prod-data-123456789012` (substituting the actual account ID)" },
      { label: "B", text: '`${Environment}-data-${AWS::AccountId}` (literal string)' },
      { label: "C", text: "An error because `AWS::AccountId` is not a valid pseudo parameter" },
      { label: "D", text: "`prod-data-` (account ID is empty)" },
    ],
    correctAnswer: "A",
    explanation:
      "`!Sub` substitutes variables in the string. `${Environment}` resolves to the parameter's default value `prod`, and `${AWS::AccountId}` is a pseudo parameter that resolves to the AWS account ID.",
    hint: "`!Sub` replaces `${...}` placeholders with parameter values and pseudo parameters.",
    tags: ["cloudformation", "sub", "pseudo-parameters"],
  },

  // ─── VPC ───────────────────────────────────────────────────────────────
  {
    id: "quiz-aws-vpc-01",
    trackId: "aws",
    category: "VPC",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "A ____ subnet is one that has a route to an Internet Gateway, allowing instances to communicate directly with the internet.",
    options: [
      { label: "A", text: "public" },
      { label: "B", text: "private" },
      { label: "C", text: "isolated" },
      { label: "D", text: "hybrid" },
    ],
    correctAnswer: "A",
    explanation:
      "A public subnet has a route table entry pointing to an Internet Gateway (IGW). Instances in public subnets also need a public or Elastic IP to send and receive internet traffic.",
    hint: "This subnet type has a route table entry targeting an IGW.",
    tags: ["vpc", "subnets", "networking"],
  },
  {
    id: "quiz-aws-vpc-02",
    trackId: "aws",
    category: "VPC",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "How do Network ACLs (NACLs) differ from Security Groups in a VPC?",
    options: [
      { label: "A", text: "NACLs are stateful; Security Groups are stateless" },
      { label: "B", text: "NACLs are stateless and operate at the subnet level; Security Groups are stateful and operate at the instance level" },
      { label: "C", text: "NACLs only support Allow rules; Security Groups support Allow and Deny rules" },
      { label: "D", text: "NACLs and Security Groups are functionally identical" },
    ],
    correctAnswer: "B",
    explanation:
      "NACLs are stateless (require explicit inbound and outbound rules) and apply to all traffic entering or leaving a subnet. Security Groups are stateful and apply at the ENI/instance level.",
    hint: "One is applied at the subnet boundary, the other at the network interface.",
    tags: ["vpc", "nacls", "security-groups", "networking"],
  },
  {
    id: "quiz-aws-vpc-03",
    trackId: "aws",
    category: "VPC",
    difficulty: "advanced",
    type: "output-prediction",
    question:
      "A private subnet has no Internet Gateway route. The following rule exists in the route table. Where does outbound internet traffic go?",
    codeSnippet: `Destination: 0.0.0.0/0
Target: nat-0a1b2c3d4e5f67890`,
    options: [
      { label: "A", text: "Traffic is routed to a NAT Gateway, which forwards it to the internet" },
      { label: "B", text: "Traffic is dropped because private subnets cannot access the internet" },
      { label: "C", text: "Traffic is routed to a VPN endpoint" },
      { label: "D", text: "Traffic is sent to a VPC peering connection" },
    ],
    correctAnswer: "A",
    explanation:
      "The `nat-` prefix indicates a NAT Gateway. Private subnet instances send outbound internet traffic through a NAT Gateway, which resides in a public subnet and forwards traffic to the IGW.",
    hint: "Look at the target prefix to identify what type of resource handles the traffic.",
    tags: ["vpc", "nat-gateway", "routing", "networking"],
  },

  // ─── CloudWatch ────────────────────────────────────────────────────────
  {
    id: "quiz-aws-cloudwatch-01",
    trackId: "aws",
    category: "CloudWatch",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "CloudWatch ____ allow you to send notifications or trigger actions when a metric crosses a defined threshold.",
    options: [
      { label: "A", text: "Alarms" },
      { label: "B", text: "Dashboards" },
      { label: "C", text: "Insights" },
      { label: "D", text: "Events" },
    ],
    correctAnswer: "A",
    explanation:
      "CloudWatch Alarms monitor metrics and perform actions (like SNS notifications or Auto Scaling) when the metric breaches a threshold for a specified number of evaluation periods.",
    hint: "These can trigger SNS notifications or Auto Scaling actions.",
    tags: ["cloudwatch", "alarms", "monitoring"],
  },
  {
    id: "quiz-aws-cloudwatch-02",
    trackId: "aws",
    category: "CloudWatch",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What does this CloudWatch Logs Insights query return?",
    codeSnippet: `fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 20`,
    options: [
      { label: "A", text: "The 20 most recent log entries containing the word ERROR" },
      { label: "B", text: "All log entries from the last 20 minutes" },
      { label: "C", text: "A count of ERROR messages grouped by timestamp" },
      { label: "D", text: "The first 20 log entries in chronological order" },
    ],
    correctAnswer: "A",
    explanation:
      "The query selects timestamp and message fields, filters for messages matching the regex `/ERROR/`, sorts by newest first, and limits output to 20 results.",
    hint: "Read the query top to bottom: select fields, filter, sort, limit.",
    tags: ["cloudwatch", "logs-insights", "queries"],
  },
  {
    id: "quiz-aws-cloudwatch-03",
    trackId: "aws",
    category: "CloudWatch",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "EC2 basic monitoring sends metrics to CloudWatch every 5 minutes. What must you enable to get metrics at 1-minute intervals?",
    options: [
      { label: "A", text: "Enhanced monitoring" },
      { label: "B", text: "Detailed monitoring" },
      { label: "C", text: "High-resolution metrics" },
      { label: "D", text: "Real-time monitoring" },
    ],
    correctAnswer: "B",
    explanation:
      "Detailed monitoring sends EC2 metrics every 1 minute instead of the default 5 minutes. High-resolution metrics (custom metrics at sub-minute intervals) are a separate feature for custom metrics.",
    hint: "This is a per-instance setting that reduces the metric reporting interval.",
    tags: ["cloudwatch", "ec2", "monitoring", "metrics"],
  },
];
