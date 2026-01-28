import { Lesson } from './lessons';

// AWS Fundamentals (8 lessons)
export const awsFundamentals: Lesson[] = [
  {
    id: 'aws-1',
    slug: 'introduction-to-aws',
    title: 'Introduction to AWS',
    description: 'Learn AWS fundamentals, regions, and core services.',
    order: 1,
    category: 'aws',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `
# Introduction to AWS

Amazon Web Services (AWS) is the world's leading cloud platform.

## Key Concepts

- **Regions**: Geographic locations with multiple data centers
- **Availability Zones (AZs)**: Isolated data centers within a region
- **Edge Locations**: CDN endpoints for CloudFront

## Core Services

| Service | Purpose |
|---------|---------|
| EC2 | Virtual servers |
| S3 | Object storage |
| RDS | Managed databases |
| Lambda | Serverless functions |
| VPC | Virtual networking |

## Free Tier

Many services offer a free tier for 12 months or always-free usage.
    `,
    codeExamples: [
      {
        title: 'AWS SDK Setup',
        code: `// Install: npm install @aws-sdk/client-s3
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function listBuckets() {
  const response = await client.send(new ListBucketsCommand({}));
  console.log('Buckets:', response.Buckets);
}`,
        explanation: 'Basic AWS SDK v3 setup for S3.'
      }
    ],
    challenge: {
      starterCode: `// Match AWS services to their purposes
const awsServices = {
  EC2: '', // Virtual machines, S3, Lambda, etc.
  S3: '',
  Lambda: '',
  RDS: '',
  CloudFront: ''
};`,
      solution: `const awsServices = {
  EC2: 'Virtual servers',
  S3: 'Object storage',
  Lambda: 'Serverless functions',
  RDS: 'Managed databases',
  CloudFront: 'CDN'
};`,
      tests: [
        { input: 'awsServices.S3', expected: 'Object storage', description: 'S3 is object storage' }
      ],
      hints: ['EC2 = Elastic Compute Cloud', 'S3 = Simple Storage Service']
    }
  },
  {
    id: 'aws-2',
    slug: 'iam',
    title: 'IAM (Identity and Access Management)',
    description: 'Manage AWS users, roles, and permissions securely.',
    order: 2,
    category: 'aws',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    content: `
# IAM (Identity and Access Management)

IAM controls who can access what in AWS.

## Key Components

- **Users**: Individual accounts
- **Groups**: Collection of users
- **Roles**: Temporary credentials for services
- **Policies**: JSON documents defining permissions

## Policy Structure

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}
\`\`\`

## Best Practices

- Use least privilege principle
- Enable MFA for all users
- Use roles instead of long-term credentials
    `,
    codeExamples: [
      {
        title: 'IAM Policy for S3 Access',
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-app-bucket"
    },
    {
      "Sid": "ReadWriteObjects",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::my-app-bucket/*"
    }
  ]
}`,
        explanation: 'IAM policy allowing S3 bucket operations.'
      }
    ],
    challenge: {
      starterCode: `// Create an IAM policy that:
// - Allows reading from a specific S3 bucket
// - Denies deletion
// Bucket name: "production-assets"

const policy = {
  Version: "2012-10-17",
  Statement: [
    // Your statements here
  ]
};`,
      solution: `const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: ["s3:GetObject", "s3:ListBucket"],
      Resource: [
        "arn:aws:s3:::production-assets",
        "arn:aws:s3:::production-assets/*"
      ]
    },
    {
      Effect: "Deny",
      Action: ["s3:DeleteObject"],
      Resource: "arn:aws:s3:::production-assets/*"
    }
  ]
};`,
      tests: [
        { input: 'policy.Statement.length', expected: '2', description: 'Should have 2 statements' }
      ],
      hints: ['Use Allow for read actions', 'Explicit Deny for delete']
    }
  },
  {
    id: 'aws-3',
    slug: 'aws-cli',
    title: 'AWS CLI',
    description: 'Master the AWS Command Line Interface.',
    order: 3,
    category: 'aws',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# AWS CLI

The AWS CLI lets you manage AWS services from the command line.

## Installation & Configuration

\`\`\`bash
# Install
brew install awscli  # macOS

# Configure
aws configure
# Enter: Access Key, Secret Key, Region, Output format
\`\`\`

## Common Commands

\`\`\`bash
# S3
aws s3 ls
aws s3 cp file.txt s3://bucket/
aws s3 sync ./folder s3://bucket/folder

# EC2
aws ec2 describe-instances
aws ec2 start-instances --instance-ids i-xxx

# Lambda
aws lambda list-functions
aws lambda invoke --function-name myFunc output.txt
\`\`\`

## Profiles

\`\`\`bash
aws configure --profile production
aws s3 ls --profile production
\`\`\`
    `,
    codeExamples: [
      {
        title: 'CLI Scripts for Automation',
        code: `#!/bin/bash
# deploy.sh - Deploy to S3

BUCKET="my-app-bucket"
BUILD_DIR="./dist"

# Build the app
npm run build

# Sync to S3
aws s3 sync $BUILD_DIR s3://$BUCKET --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \\
  --distribution-id EXXX \\
  --paths "/*"

echo "Deployed successfully!"`,
        explanation: 'Bash script for deploying to S3 with CloudFront invalidation.'
      }
    ],
    challenge: {
      starterCode: `// Write CLI commands for these tasks:

const cliCommands = {
  // List all S3 buckets
  listBuckets: '',

  // Copy local file.txt to s3://my-bucket/uploads/
  copyFile: '',

  // Download all files from s3://my-bucket/data/ to ./local-data/
  downloadFolder: ''
};`,
      solution: `const cliCommands = {
  listBuckets: 'aws s3 ls',
  copyFile: 'aws s3 cp file.txt s3://my-bucket/uploads/',
  downloadFolder: 'aws s3 sync s3://my-bucket/data/ ./local-data/'
};`,
      tests: [
        { input: 'cliCommands.listBuckets', expected: 'aws s3 ls', description: 'List buckets command' }
      ],
      hints: ['aws s3 ls lists buckets', 'cp for single file, sync for folders']
    }
  },
  {
    id: 'aws-4',
    slug: 's3-basics',
    title: 'S3 Basics',
    description: 'Store and manage objects in Amazon S3.',
    order: 4,
    category: 'aws',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    content: `
# S3 (Simple Storage Service)

S3 provides scalable object storage.

## Key Concepts

- **Bucket**: Container for objects
- **Object**: File + metadata
- **Key**: Object's unique identifier (path)

## Creating a Bucket

\`\`\`javascript
import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'us-east-1' });

await client.send(new CreateBucketCommand({
  Bucket: 'my-unique-bucket-name'
}));
\`\`\`

## Storage Classes

- Standard: Frequent access
- Intelligent-Tiering: Auto-optimization
- Glacier: Archive storage
    `,
    codeExamples: [
      {
        title: 'S3 Upload and Download',
        code: `import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: 'us-east-1' });

// Upload file
async function uploadFile(bucket, key, body) {
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: 'application/json'
  }));
}

// Download file
async function downloadFile(bucket, key) {
  const response = await s3.send(new GetObjectCommand({
    Bucket: bucket,
    Key: key
  }));
  return response.Body.transformToString();
}

// Generate presigned URL
async function getPresignedUrl(bucket, key) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}`,
        explanation: 'Common S3 operations with AWS SDK v3.'
      }
    ],
    challenge: {
      starterCode: `import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

// Create a function to upload JSON data to S3
async function uploadJSON(bucket: string, key: string, data: object) {
  // Convert data to JSON string
  // Upload with proper content type
  // Return success status
  // Your code here
}`,
      solution: `import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

async function uploadJSON(bucket: string, key: string, data: object) {
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: JSON.stringify(data),
    ContentType: 'application/json'
  }));

  return { success: true, bucket, key };
}`,
      tests: [
        { input: 'typeof uploadJSON', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['JSON.stringify to convert object', 'Set ContentType header']
    }
  },
  {
    id: 'aws-5',
    slug: 's3-advanced',
    title: 'S3 Advanced Features',
    description: 'Master S3 versioning, lifecycle policies, and static hosting.',
    order: 5,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# S3 Advanced Features

## Versioning

Keep multiple versions of objects:

\`\`\`javascript
// Enable versioning
await s3.send(new PutBucketVersioningCommand({
  Bucket: 'my-bucket',
  VersioningConfiguration: { Status: 'Enabled' }
}));
\`\`\`

## Lifecycle Rules

Automate object transitions and deletion:

\`\`\`json
{
  "Rules": [{
    "ID": "MoveToGlacier",
    "Status": "Enabled",
    "Transitions": [{
      "Days": 90,
      "StorageClass": "GLACIER"
    }],
    "Expiration": { "Days": 365 }
  }]
}
\`\`\`

## Static Website Hosting

S3 can host static websites with:
- Index document (index.html)
- Error document (404.html)
- Custom domain support
    `,
    codeExamples: [
      {
        title: 'Configure Static Website',
        code: `import {
  S3Client,
  PutBucketWebsiteCommand,
  PutBucketPolicyCommand
} from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });
const bucket = 'my-website-bucket';

// Enable static website hosting
await s3.send(new PutBucketWebsiteCommand({
  Bucket: bucket,
  WebsiteConfiguration: {
    IndexDocument: { Suffix: 'index.html' },
    ErrorDocument: { Key: '404.html' }
  }
}));

// Make bucket public
const policy = {
  Version: '2012-10-17',
  Statement: [{
    Sid: 'PublicReadGetObject',
    Effect: 'Allow',
    Principal: '*',
    Action: 's3:GetObject',
    Resource: \`arn:aws:s3:::\${bucket}/*\`
  }]
};

await s3.send(new PutBucketPolicyCommand({
  Bucket: bucket,
  Policy: JSON.stringify(policy)
}));

console.log(\`Website: http://\${bucket}.s3-website-us-east-1.amazonaws.com\`);`,
        explanation: 'Setting up S3 static website hosting.'
      }
    ],
    challenge: {
      starterCode: `// Create a lifecycle policy configuration
// Requirements:
// - Move to Standard-IA after 30 days
// - Move to Glacier after 90 days
// - Delete after 365 days

const lifecyclePolicy = {
  Rules: [
    // Your rules here
  ]
};`,
      solution: `const lifecyclePolicy = {
  Rules: [
    {
      ID: 'ArchiveAndDelete',
      Status: 'Enabled',
      Filter: { Prefix: '' },
      Transitions: [
        {
          Days: 30,
          StorageClass: 'STANDARD_IA'
        },
        {
          Days: 90,
          StorageClass: 'GLACIER'
        }
      ],
      Expiration: {
        Days: 365
      }
    }
  ]
};`,
      tests: [
        { input: 'lifecyclePolicy.Rules[0].Transitions.length', expected: '2', description: 'Should have 2 transitions' }
      ],
      hints: ['Transitions is an array of storage class changes', 'Expiration deletes objects']
    }
  },
  {
    id: 'aws-6',
    slug: 'ec2-basics',
    title: 'EC2 Basics',
    description: 'Launch and manage virtual servers on EC2.',
    order: 6,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# EC2 (Elastic Compute Cloud)

EC2 provides resizable compute capacity.

## Instance Types

| Family | Use Case |
|--------|----------|
| t3 | General purpose, burstable |
| m6i | Balanced compute/memory |
| c6i | Compute-intensive |
| r6i | Memory-intensive |
| g4 | GPU workloads |

## Launching an Instance

1. Choose AMI (Amazon Machine Image)
2. Select instance type
3. Configure network/security
4. Add storage
5. Add tags
6. Configure security group
7. Create/select key pair

## Security Groups

Virtual firewalls controlling inbound/outbound traffic.
    `,
    codeExamples: [
      {
        title: 'Launch EC2 with SDK',
        code: `import { EC2Client, RunInstancesCommand } from '@aws-sdk/client-ec2';

const ec2 = new EC2Client({ region: 'us-east-1' });

async function launchInstance() {
  const response = await ec2.send(new RunInstancesCommand({
    ImageId: 'ami-0123456789abcdef0', // Amazon Linux 2
    InstanceType: 't3.micro',
    MinCount: 1,
    MaxCount: 1,
    KeyName: 'my-key-pair',
    SecurityGroupIds: ['sg-12345678'],
    UserData: Buffer.from(\`#!/bin/bash
      yum update -y
      yum install -y nodejs
      npm install -g pm2
    \`).toString('base64'),
    TagSpecifications: [{
      ResourceType: 'instance',
      Tags: [{ Key: 'Name', Value: 'WebServer' }]
    }]
  }));

  return response.Instances[0].InstanceId;
}`,
        explanation: 'Launching an EC2 instance with user data script.'
      }
    ],
    challenge: {
      starterCode: `// Create a security group configuration for a web server
// Allow: HTTP (80), HTTPS (443), SSH (22 from your IP only)

const securityGroupRules = {
  inbound: [
    // Your rules here
  ],
  outbound: [
    { protocol: '-1', port: 'all', cidr: '0.0.0.0/0' }
  ]
};`,
      solution: `const securityGroupRules = {
  inbound: [
    { protocol: 'tcp', port: 80, cidr: '0.0.0.0/0', description: 'HTTP' },
    { protocol: 'tcp', port: 443, cidr: '0.0.0.0/0', description: 'HTTPS' },
    { protocol: 'tcp', port: 22, cidr: 'YOUR_IP/32', description: 'SSH' }
  ],
  outbound: [
    { protocol: '-1', port: 'all', cidr: '0.0.0.0/0' }
  ]
};`,
      tests: [
        { input: 'securityGroupRules.inbound.length', expected: '3', description: 'Should have 3 inbound rules' }
      ],
      hints: ['HTTP is port 80, HTTPS is 443', 'Restrict SSH to specific IP']
    }
  },
  {
    id: 'aws-7',
    slug: 'ec2-advanced',
    title: 'EC2 Advanced',
    description: 'Master EBS volumes, snapshots, and auto-scaling.',
    order: 7,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# EC2 Advanced

## EBS (Elastic Block Store)

Persistent block storage for EC2:

\`\`\`javascript
import { EC2Client, CreateVolumeCommand } from '@aws-sdk/client-ec2';

await ec2.send(new CreateVolumeCommand({
  AvailabilityZone: 'us-east-1a',
  Size: 100, // GB
  VolumeType: 'gp3',
  Iops: 3000,
  Throughput: 125
}));
\`\`\`

## Volume Types

- gp3: General purpose SSD (default)
- io2: High performance SSD
- st1: Throughput optimized HDD
- sc1: Cold HDD

## Auto Scaling

Automatically adjust capacity based on demand.
    `,
    codeExamples: [
      {
        title: 'Auto Scaling Configuration',
        code: `import {
  AutoScalingClient,
  CreateAutoScalingGroupCommand,
  PutScalingPolicyCommand
} from '@aws-sdk/client-auto-scaling';

const autoScaling = new AutoScalingClient({ region: 'us-east-1' });

// Create Auto Scaling Group
await autoScaling.send(new CreateAutoScalingGroupCommand({
  AutoScalingGroupName: 'web-servers',
  LaunchTemplate: {
    LaunchTemplateId: 'lt-xxx',
    Version: '$Latest'
  },
  MinSize: 2,
  MaxSize: 10,
  DesiredCapacity: 2,
  VPCZoneIdentifier: 'subnet-xxx,subnet-yyy',
  TargetGroupARNs: ['arn:aws:elasticloadbalancing:...'],
  Tags: [{
    Key: 'Environment',
    Value: 'production',
    PropagateAtLaunch: true
  }]
}));

// Add scaling policy
await autoScaling.send(new PutScalingPolicyCommand({
  AutoScalingGroupName: 'web-servers',
  PolicyName: 'scale-on-cpu',
  PolicyType: 'TargetTrackingScaling',
  TargetTrackingConfiguration: {
    PredefinedMetricSpecification: {
      PredefinedMetricType: 'ASGAverageCPUUtilization'
    },
    TargetValue: 70.0
  }
}));`,
        explanation: 'Auto Scaling group with CPU-based scaling policy.'
      }
    ],
    challenge: {
      starterCode: `// Design an auto-scaling configuration
// Requirements:
// - Min 2 instances, Max 8
// - Scale out at 80% CPU
// - Scale in at 30% CPU

const autoScalingConfig = {
  minSize: 0,
  maxSize: 0,
  desiredCapacity: 0,
  scaleOutThreshold: 0,
  scaleInThreshold: 0
};`,
      solution: `const autoScalingConfig = {
  minSize: 2,
  maxSize: 8,
  desiredCapacity: 2,
  scaleOutThreshold: 80,
  scaleInThreshold: 30
};`,
      tests: [
        { input: 'autoScalingConfig.minSize', expected: '2', description: 'Min should be 2' },
        { input: 'autoScalingConfig.maxSize', expected: '8', description: 'Max should be 8' }
      ],
      hints: ['desiredCapacity is usually same as min', 'Scale out = add instances']
    }
  },
  {
    id: 'aws-8',
    slug: 'vpc-networking',
    title: 'VPC Networking',
    description: 'Design secure networks with VPC, subnets, and gateways.',
    order: 8,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# VPC (Virtual Private Cloud)

VPC lets you create isolated networks in AWS.

## Components

- **VPC**: Your private network (e.g., 10.0.0.0/16)
- **Subnets**: Subdivisions of VPC (public/private)
- **Internet Gateway**: Connects VPC to internet
- **NAT Gateway**: Allows private subnets outbound access
- **Route Tables**: Control traffic routing

## Typical Architecture

\`\`\`
VPC (10.0.0.0/16)
├── Public Subnet (10.0.1.0/24)
│   ├── Internet Gateway
│   ├── Load Balancer
│   └── NAT Gateway
└── Private Subnet (10.0.2.0/24)
    ├── EC2 instances
    └── RDS databases
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Create VPC with Subnets',
        code: `import {
  EC2Client,
  CreateVpcCommand,
  CreateSubnetCommand,
  CreateInternetGatewayCommand,
  AttachInternetGatewayCommand
} from '@aws-sdk/client-ec2';

const ec2 = new EC2Client({ region: 'us-east-1' });

async function createVpc() {
  // Create VPC
  const vpc = await ec2.send(new CreateVpcCommand({
    CidrBlock: '10.0.0.0/16',
    TagSpecifications: [{
      ResourceType: 'vpc',
      Tags: [{ Key: 'Name', Value: 'MyVPC' }]
    }]
  }));
  const vpcId = vpc.Vpc.VpcId;

  // Create public subnet
  const publicSubnet = await ec2.send(new CreateSubnetCommand({
    VpcId: vpcId,
    CidrBlock: '10.0.1.0/24',
    AvailabilityZone: 'us-east-1a',
    TagSpecifications: [{
      ResourceType: 'subnet',
      Tags: [{ Key: 'Name', Value: 'PublicSubnet' }]
    }]
  }));

  // Create and attach Internet Gateway
  const igw = await ec2.send(new CreateInternetGatewayCommand({}));
  await ec2.send(new AttachInternetGatewayCommand({
    InternetGatewayId: igw.InternetGateway.InternetGatewayId,
    VpcId: vpcId
  }));

  return { vpcId, publicSubnetId: publicSubnet.Subnet.SubnetId };
}`,
        explanation: 'Creating a VPC with public subnet and internet gateway.'
      }
    ],
    challenge: {
      starterCode: `// Design a VPC CIDR scheme for:
// - VPC with room for 4 subnets
// - 2 public subnets (web tier)
// - 2 private subnets (app tier)

const vpcDesign = {
  vpcCidr: '',        // Main VPC CIDR
  publicSubnet1: '',  // AZ-a public
  publicSubnet2: '',  // AZ-b public
  privateSubnet1: '', // AZ-a private
  privateSubnet2: ''  // AZ-b private
};`,
      solution: `const vpcDesign = {
  vpcCidr: '10.0.0.0/16',
  publicSubnet1: '10.0.1.0/24',
  publicSubnet2: '10.0.2.0/24',
  privateSubnet1: '10.0.3.0/24',
  privateSubnet2: '10.0.4.0/24'
};`,
      tests: [
        { input: 'vpcDesign.vpcCidr', expected: '10.0.0.0/16', description: 'VPC should be /16' }
      ],
      hints: ['/16 gives 65,536 IPs', '/24 subnets give 256 IPs each']
    }
  }
];

// AWS Serverless (8 lessons)
export const awsServerless: Lesson[] = [
  {
    id: 'aws-9',
    slug: 'lambda-basics',
    title: 'Lambda Basics',
    description: 'Create serverless functions with AWS Lambda.',
    order: 9,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# AWS Lambda

Run code without managing servers.

## Handler Function

\`\`\`javascript
export const handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello!' })
  };
};
\`\`\`

## Event Sources

- API Gateway (HTTP requests)
- S3 (file uploads)
- DynamoDB Streams
- SQS/SNS (messages)
- CloudWatch Events (scheduled)

## Limits

- Max execution time: 15 minutes
- Max memory: 10 GB
- Max package size: 50 MB (250 MB unzipped)
    `,
    codeExamples: [
      {
        title: 'Lambda with TypeScript',
        code: `// handler.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface User {
  id: string;
  name: string;
  email: string;
}

export const getUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.pathParameters?.id;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'User ID required' })
      };
    }

    // Fetch user from database
    const user: User = await db.users.findById(userId);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};`,
        explanation: 'TypeScript Lambda handler with proper error handling.'
      }
    ],
    challenge: {
      starterCode: `// Create a Lambda handler that:
// - Receives a POST request with { name, email }
// - Validates the input
// - Returns created user with generated ID

export const createUser = async (event) => {
  // Parse body
  // Validate name and email
  // Return user with 201 status
  // Your code here
};`,
      solution: `export const createUser = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email } = body;

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and email required' })
      };
    }

    const user = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString()
    };

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};`,
      tests: [
        { input: 'typeof createUser', expected: 'function', description: 'Should export handler' }
      ],
      hints: ['Parse event.body for POST data', 'Return 201 for created resources']
    }
  },
  {
    id: 'aws-10',
    slug: 'lambda-advanced',
    title: 'Lambda Advanced',
    description: 'Master Lambda layers, cold starts, and optimization.',
    order: 10,
    category: 'aws',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `
# Lambda Advanced

## Layers

Share code across functions:

\`\`\`bash
# Create layer
zip -r layer.zip nodejs/
aws lambda publish-layer-version \\
  --layer-name shared-utils \\
  --zip-file fileb://layer.zip
\`\`\`

## Cold Starts

First invocation is slower. Mitigate with:
- Provisioned concurrency
- Smaller packages
- Lazy loading

## Environment Variables

\`\`\`javascript
const dbUrl = process.env.DATABASE_URL;
const secret = process.env.API_SECRET;
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Optimized Lambda with Connection Reuse',
        code: `import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

// Initialize outside handler for connection reuse
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Lazy load heavy dependencies
let heavyModule;
const getHeavyModule = async () => {
  if (!heavyModule) {
    heavyModule = await import('./heavy-module');
  }
  return heavyModule;
};

export const handler = async (event) => {
  const { id } = event.pathParameters;

  // Reuse connection
  const result = await docClient.send(new GetCommand({
    TableName: process.env.TABLE_NAME,
    Key: { id }
  }));

  // Only load heavy module when needed
  if (result.Item?.requiresProcessing) {
    const heavy = await getHeavyModule();
    await heavy.process(result.Item);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item)
  };
};`,
        explanation: 'Connection reuse and lazy loading for better performance.'
      }
    ],
    challenge: {
      starterCode: `// Create a wrapper for Lambda handlers that:
// - Parses JSON body automatically
// - Catches errors and returns proper responses
// - Adds CORS headers

function withMiddleware(handler) {
  return async (event) => {
    // Add middleware logic here
  };
}

// Usage:
// export const myHandler = withMiddleware(async (event) => { ... });`,
      solution: `function withMiddleware(handler) {
  return async (event) => {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    try {
      // Parse body if exists
      if (event.body) {
        event.parsedBody = JSON.parse(event.body);
      }

      const result = await handler(event);

      return {
        ...result,
        headers: { ...corsHeaders, ...result.headers }
      };
    } catch (error) {
      console.error('Handler error:', error);
      return {
        statusCode: error.statusCode || 500,
        headers: corsHeaders,
        body: JSON.stringify({
          error: error.message || 'Internal server error'
        })
      };
    }
  };
}`,
      tests: [
        { input: 'typeof withMiddleware', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Return a new async function', 'Wrap handler call in try/catch']
    }
  },
  {
    id: 'aws-11',
    slug: 'api-gateway',
    title: 'API Gateway',
    description: 'Build REST APIs with Amazon API Gateway.',
    order: 11,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# API Gateway

Create, publish, and manage APIs.

## API Types

- **REST API**: Full-featured, caching, WAF
- **HTTP API**: Simpler, cheaper, faster
- **WebSocket API**: Real-time communication

## Integration with Lambda

\`\`\`yaml
# SAM template
Resources:
  ApiFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Events:
        Api:
          Type: Api
          Properties:
            Path: /users
            Method: GET
\`\`\`

## Request/Response Transformation

API Gateway can transform requests before Lambda and responses after.
    `,
    codeExamples: [
      {
        title: 'API Gateway with Lambda Proxy',
        code: `// Lambda handler for API Gateway
export const handler = async (event) => {
  const {
    httpMethod,
    path,
    pathParameters,
    queryStringParameters,
    headers,
    body
  } = event;

  console.log('Request:', { httpMethod, path, pathParameters });

  // Route handling
  if (httpMethod === 'GET' && path === '/users') {
    return listUsers(queryStringParameters);
  }

  if (httpMethod === 'GET' && path.match(/\\/users\\/[^/]+/)) {
    return getUser(pathParameters.id);
  }

  if (httpMethod === 'POST' && path === '/users') {
    return createUser(JSON.parse(body));
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Not found' })
  };
};

async function listUsers(query) {
  const limit = parseInt(query?.limit) || 10;
  // Fetch users...
  return {
    statusCode: 200,
    body: JSON.stringify({ users: [], limit })
  };
}`,
        explanation: 'Handling multiple routes in a single Lambda function.'
      }
    ],
    challenge: {
      starterCode: `// Create a router for API Gateway events
class ApiRouter {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    // Register GET route
  }

  post(path, handler) {
    // Register POST route
  }

  async handle(event) {
    // Match route and call handler
  }
}`,
      solution: `class ApiRouter {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    this.routes.push({ method: 'GET', path, handler });
  }

  post(path, handler) {
    this.routes.push({ method: 'POST', path, handler });
  }

  async handle(event) {
    const { httpMethod, path } = event;

    const route = this.routes.find(r =>
      r.method === httpMethod && r.path === path
    );

    if (!route) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
    }

    return route.handler(event);
  }
}`,
      tests: [
        { input: 'typeof ApiRouter', expected: 'function', description: 'Should be a class' }
      ],
      hints: ['Store routes in an array', 'Match method and path']
    }
  },
  {
    id: 'aws-12',
    slug: 'api-gateway-lambda-integration',
    title: 'API Gateway + Lambda Integration',
    description: 'Connect API Gateway with Lambda for full API workflows.',
    order: 12,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# API Gateway + Lambda Integration

## CORS Configuration

\`\`\`javascript
return {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
  body: JSON.stringify(data)
};
\`\`\`

## Authorization

- IAM authorization
- Lambda authorizers
- Cognito user pools
- API keys

## Stages

Deploy API to stages (dev, staging, prod) with different configurations.
    `,
    codeExamples: [
      {
        title: 'Lambda Authorizer',
        code: `// authorizer.js
export const handler = async (event) => {
  const token = event.authorizationToken?.replace('Bearer ', '');

  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    // Verify token (JWT, custom, etc.)
    const user = await verifyToken(token);

    return {
      principalId: user.id,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: event.methodArn
        }]
      },
      context: {
        userId: user.id,
        email: user.email,
        role: user.role
      }
    };
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

// In your API handler, access context:
export const apiHandler = async (event) => {
  const userId = event.requestContext.authorizer.userId;
  // ...
};`,
        explanation: 'Custom Lambda authorizer for API authentication.'
      }
    ],
    challenge: {
      starterCode: `// Create a response helper with CORS support
function apiResponse(statusCode, body, options = {}) {
  // Return API Gateway response format
  // Include CORS headers
  // Allow custom headers via options
  // Your code here
}`,
      solution: `function apiResponse(statusCode, body, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': options.origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  return {
    statusCode,
    headers: { ...defaultHeaders, ...options.headers },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };
}`,
      tests: [
        { input: 'apiResponse(200, {}).statusCode', expected: '200', description: 'Should return status code' }
      ],
      hints: ['Spread default headers with custom ones', 'Stringify body if object']
    }
  },
  {
    id: 'aws-13',
    slug: 'dynamodb',
    title: 'DynamoDB Basics',
    description: 'Work with DynamoDB for scalable NoSQL storage.',
    order: 13,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# DynamoDB

Fully managed NoSQL database service.

## Key Concepts

- **Table**: Collection of items
- **Item**: Collection of attributes
- **Primary Key**: Partition key or partition + sort key
- **GSI**: Global Secondary Index

## Data Types

- S: String
- N: Number
- B: Binary
- BOOL: Boolean
- L: List
- M: Map
- SS/NS/BS: Sets

## Capacity Modes

- **On-demand**: Pay per request
- **Provisioned**: Specify read/write capacity units
    `,
    codeExamples: [
      {
        title: 'DynamoDB CRUD Operations',
        code: `import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = 'Users';

// Create
async function createUser(user) {
  await docClient.send(new PutCommand({
    TableName: TABLE,
    Item: { ...user, createdAt: Date.now() }
  }));
}

// Read
async function getUser(id) {
  const result = await docClient.send(new GetCommand({
    TableName: TABLE,
    Key: { id }
  }));
  return result.Item;
}

// Update
async function updateUser(id, updates) {
  const result = await docClient.send(new UpdateCommand({
    TableName: TABLE,
    Key: { id },
    UpdateExpression: 'SET #name = :name, email = :email',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: {
      ':name': updates.name,
      ':email': updates.email
    },
    ReturnValues: 'ALL_NEW'
  }));
  return result.Attributes;
}

// Delete
async function deleteUser(id) {
  await docClient.send(new DeleteCommand({
    TableName: TABLE,
    Key: { id }
  }));
}`,
        explanation: 'Complete CRUD operations with DynamoDB Document Client.'
      }
    ],
    challenge: {
      starterCode: `import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

// Create a function to query users by status
// Table has GSI: status-index (status as partition key, createdAt as sort key)

async function getUsersByStatus(docClient, status, limit = 10) {
  // Query using GSI
  // Return items sorted by createdAt descending
  // Your code here
}`,
      solution: `import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

async function getUsersByStatus(docClient, status, limit = 10) {
  const result = await docClient.send(new QueryCommand({
    TableName: 'Users',
    IndexName: 'status-index',
    KeyConditionExpression: '#status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': status },
    Limit: limit,
    ScanIndexForward: false // Descending order
  }));

  return result.Items;
}`,
      tests: [
        { input: 'typeof getUsersByStatus', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use IndexName to query GSI', 'ScanIndexForward: false for descending']
    }
  },
  {
    id: 'aws-14',
    slug: 'dynamodb-advanced',
    title: 'DynamoDB Advanced',
    description: 'Master DynamoDB TTL, streams, and transactions.',
    order: 14,
    category: 'aws',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `
# DynamoDB Advanced

## TTL (Time to Live)

Automatically delete expired items:

\`\`\`javascript
await docClient.send(new PutCommand({
  TableName: 'Sessions',
  Item: {
    sessionId: 'xxx',
    userId: '123',
    ttl: Math.floor(Date.now() / 1000) + 3600 // Expires in 1 hour
  }
}));
\`\`\`

## Streams

Capture item-level changes for:
- Replication
- Triggering Lambda
- Analytics

## Transactions

Atomic operations across items:

\`\`\`javascript
await client.send(new TransactWriteItemsCommand({
  TransactItems: [
    { Put: { TableName: 'Orders', Item: order } },
    { Update: { TableName: 'Inventory', ... } }
  ]
}));
\`\`\`
    `,
    codeExamples: [
      {
        title: 'DynamoDB Transactions',
        code: `import { DynamoDBClient, TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({});

async function transferMoney(fromAccount, toAccount, amount) {
  await client.send(new TransactWriteItemsCommand({
    TransactItems: [
      {
        Update: {
          TableName: 'Accounts',
          Key: marshall({ id: fromAccount }),
          UpdateExpression: 'SET balance = balance - :amount',
          ConditionExpression: 'balance >= :amount',
          ExpressionAttributeValues: marshall({ ':amount': amount })
        }
      },
      {
        Update: {
          TableName: 'Accounts',
          Key: marshall({ id: toAccount }),
          UpdateExpression: 'SET balance = balance + :amount',
          ExpressionAttributeValues: marshall({ ':amount': amount })
        }
      },
      {
        Put: {
          TableName: 'Transactions',
          Item: marshall({
            id: Date.now().toString(),
            from: fromAccount,
            to: toAccount,
            amount,
            timestamp: new Date().toISOString()
          })
        }
      }
    ]
  }));
}`,
        explanation: 'Atomic transaction for money transfer with audit log.'
      }
    ],
    challenge: {
      starterCode: `// Create a function to batch write items with TTL
// Items should expire after specified hours

async function batchWriteWithTTL(docClient, tableName, items, ttlHours) {
  // Add TTL to each item
  // Use BatchWriteCommand
  // Handle 25 item limit
  // Your code here
}`,
      solution: `import { BatchWriteCommand } from '@aws-sdk/lib-dynamodb';

async function batchWriteWithTTL(docClient, tableName, items, ttlHours) {
  const ttl = Math.floor(Date.now() / 1000) + (ttlHours * 3600);

  const itemsWithTTL = items.map(item => ({
    ...item,
    ttl
  }));

  // Split into chunks of 25
  const chunks = [];
  for (let i = 0; i < itemsWithTTL.length; i += 25) {
    chunks.push(itemsWithTTL.slice(i, i + 25));
  }

  for (const chunk of chunks) {
    await docClient.send(new BatchWriteCommand({
      RequestItems: {
        [tableName]: chunk.map(item => ({
          PutRequest: { Item: item }
        }))
      }
    }));
  }
}`,
      tests: [
        { input: 'typeof batchWriteWithTTL', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['TTL is Unix timestamp in seconds', 'BatchWrite limit is 25 items']
    }
  },
  {
    id: 'aws-15',
    slug: 'sqs-sns',
    title: 'SQS and SNS',
    description: 'Build event-driven architectures with queues and topics.',
    order: 15,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# SQS (Simple Queue Service) & SNS (Simple Notification Service)

## SQS

Message queue for decoupling services:

\`\`\`javascript
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqs = new SQSClient({});

await sqs.send(new SendMessageCommand({
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123/my-queue',
  MessageBody: JSON.stringify({ orderId: '123' }),
  DelaySeconds: 10
}));
\`\`\`

## SNS

Pub/sub messaging for fan-out:

\`\`\`javascript
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const sns = new SNSClient({});

await sns.send(new PublishCommand({
  TopicArn: 'arn:aws:sns:us-east-1:123:my-topic',
  Message: JSON.stringify({ event: 'order_created' }),
  Subject: 'New Order'
}));
\`\`\`
    `,
    codeExamples: [
      {
        title: 'SQS Consumer Lambda',
        code: `// Lambda triggered by SQS
export const handler = async (event) => {
  const failedMessages = [];

  for (const record of event.Records) {
    try {
      const message = JSON.parse(record.body);
      console.log('Processing:', message);

      await processOrder(message.orderId);

    } catch (error) {
      console.error('Failed to process:', record.messageId, error);
      failedMessages.push({
        itemIdentifier: record.messageId
      });
    }
  }

  // Return failed messages for retry
  return {
    batchItemFailures: failedMessages
  };
};

// SQS + SNS Fan-out Pattern
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

async function publishOrderEvent(order) {
  const sns = new SNSClient({});

  // Publish to SNS topic
  // SNS fans out to multiple SQS queues
  await sns.send(new PublishCommand({
    TopicArn: process.env.ORDER_TOPIC_ARN,
    Message: JSON.stringify(order),
    MessageAttributes: {
      eventType: {
        DataType: 'String',
        StringValue: 'ORDER_CREATED'
      }
    }
  }));
}`,
        explanation: 'SQS consumer with partial batch failure handling.'
      }
    ],
    challenge: {
      starterCode: `import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

// Create a message producer with retry logic
async function sendWithRetry(sqs, queueUrl, message, maxRetries = 3) {
  // Attempt to send message
  // Retry with exponential backoff on failure
  // Return success/failure status
  // Your code here
}`,
      solution: `import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

async function sendWithRetry(sqs, queueUrl, message, maxRetries = 3) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await sqs.send(new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(message)
      }));

      return { success: true, messageId: result.MessageId };
    } catch (error) {
      lastError = error;
      const delay = Math.pow(2, attempt) * 100;
      await new Promise(r => setTimeout(r, delay));
    }
  }

  return { success: false, error: lastError.message };
}`,
      tests: [
        { input: 'typeof sendWithRetry', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use exponential backoff: 2^attempt * base', 'Track last error for return']
    }
  },
  {
    id: 'aws-16',
    slug: 'step-functions',
    title: 'Step Functions',
    description: 'Orchestrate workflows with AWS Step Functions.',
    order: 16,
    category: 'aws',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `
# Step Functions

Coordinate distributed applications with state machines.

## State Types

- **Task**: Execute work (Lambda, API)
- **Choice**: Branching logic
- **Wait**: Delay execution
- **Parallel**: Execute branches concurrently
- **Map**: Iterate over array

## State Machine Definition

\`\`\`json
{
  "StartAt": "ProcessOrder",
  "States": {
    "ProcessOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...",
      "Next": "CheckInventory"
    },
    "CheckInventory": {
      "Type": "Choice",
      "Choices": [{
        "Variable": "$.inStock",
        "BooleanEquals": true,
        "Next": "ShipOrder"
      }],
      "Default": "BackOrder"
    }
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Order Processing State Machine',
        code: `{
  "Comment": "Order Processing Workflow",
  "StartAt": "ValidateOrder",
  "States": {
    "ValidateOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123:function:validateOrder",
      "Next": "ProcessPayment",
      "Catch": [{
        "ErrorEquals": ["ValidationError"],
        "Next": "OrderFailed"
      }]
    },
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123:function:processPayment",
      "Retry": [{
        "ErrorEquals": ["PaymentRetryable"],
        "IntervalSeconds": 2,
        "MaxAttempts": 3,
        "BackoffRate": 2
      }],
      "Next": "ParallelProcessing"
    },
    "ParallelProcessing": {
      "Type": "Parallel",
      "Branches": [
        {
          "StartAt": "UpdateInventory",
          "States": {
            "UpdateInventory": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:...",
              "End": true
            }
          }
        },
        {
          "StartAt": "SendConfirmation",
          "States": {
            "SendConfirmation": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:...",
              "End": true
            }
          }
        }
      ],
      "Next": "OrderComplete"
    },
    "OrderComplete": {
      "Type": "Succeed"
    },
    "OrderFailed": {
      "Type": "Fail",
      "Error": "OrderProcessingFailed"
    }
  }
}`,
        explanation: 'State machine with error handling, retries, and parallel execution.'
      }
    ],
    challenge: {
      starterCode: `// Create a Step Functions state machine definition for:
// 1. Validate input
// 2. If valid, process; else fail
// 3. Send notification after processing

const stateMachine = {
  Comment: "Simple workflow",
  StartAt: "",
  States: {
    // Your states here
  }
};`,
      solution: `const stateMachine = {
  Comment: "Simple workflow",
  StartAt: "ValidateInput",
  States: {
    ValidateInput: {
      Type: "Task",
      Resource: "arn:aws:lambda:us-east-1:123:function:validate",
      Next: "CheckValid"
    },
    CheckValid: {
      Type: "Choice",
      Choices: [{
        Variable: "$.isValid",
        BooleanEquals: true,
        Next: "Process"
      }],
      Default: "Fail"
    },
    Process: {
      Type: "Task",
      Resource: "arn:aws:lambda:us-east-1:123:function:process",
      Next: "Notify"
    },
    Notify: {
      Type: "Task",
      Resource: "arn:aws:lambda:us-east-1:123:function:notify",
      End: true
    },
    Fail: {
      Type: "Fail",
      Error: "ValidationFailed"
    }
  }
};`,
      tests: [
        { input: 'stateMachine.StartAt', expected: 'ValidateInput', description: 'Should start at ValidateInput' }
      ],
      hints: ['Use Choice state for branching', 'End: true marks terminal states']
    }
  }
];

// AWS Production (8 lessons) - abbreviated for space
export const awsProduction: Lesson[] = [
  {
    id: 'aws-17',
    slug: 'rds',
    title: 'RDS (Relational Database Service)',
    description: 'Deploy managed PostgreSQL and MySQL databases.',
    order: 17,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# RDS (Relational Database Service)

Managed relational databases.

## Supported Engines

- PostgreSQL
- MySQL
- MariaDB
- Oracle
- SQL Server
- Aurora (AWS proprietary)

## Features

- Automated backups
- Multi-AZ deployment
- Read replicas
- Encryption at rest
- Automated patching
    `,
    codeExamples: [
      {
        title: 'Connecting to RDS',
        code: `import { Client } from 'pg';

const client = new Client({
  host: process.env.RDS_HOSTNAME,
  port: 5432,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  ssl: { rejectUnauthorized: false }
});

await client.connect();
const result = await client.query('SELECT * FROM users');
await client.end();`,
        explanation: 'PostgreSQL connection to RDS.'
      }
    ],
    challenge: {
      starterCode: `// Create a connection pool configuration
const poolConfig = {
  // Configure for production RDS
};`,
      solution: `const poolConfig = {
  host: process.env.RDS_HOSTNAME,
  port: 5432,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: { rejectUnauthorized: false }
};`,
      tests: [
        { input: 'poolConfig.max', expected: '20', description: 'Should set max connections' }
      ],
      hints: ['Set max pool size', 'Configure timeouts for serverless']
    }
  },
  {
    id: 'aws-18',
    slug: 'elasticache',
    title: 'ElastiCache',
    description: 'Add caching with managed Redis.',
    order: 18,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `# ElastiCache\n\nManaged Redis and Memcached.`,
    codeExamples: [{ title: 'Redis Connection', code: `import { createClient } from 'redis';\nconst client = createClient({ url: process.env.REDIS_URL });`, explanation: 'Basic Redis setup.' }],
    challenge: { starterCode: `// Create cache helper`, solution: `const cache = { get: async (key) => client.get(key), set: async (key, val, ttl) => client.setEx(key, ttl, val) };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Use setEx for TTL'] }
  },
  {
    id: 'aws-19',
    slug: 'cloudfront',
    title: 'CloudFront CDN',
    description: 'Accelerate content delivery globally.',
    order: 19,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `# CloudFront\n\nGlobal CDN for static and dynamic content.`,
    codeExamples: [{ title: 'Invalidation', code: `aws cloudfront create-invalidation --distribution-id EXXX --paths "/*"`, explanation: 'Clear CDN cache.' }],
    challenge: { starterCode: `// Configure cache behavior`, solution: `const cacheBehavior = { minTTL: 0, maxTTL: 86400, defaultTTL: 3600 };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['TTL in seconds'] }
  },
  {
    id: 'aws-20',
    slug: 'route53',
    title: 'Route 53 DNS',
    description: 'Manage DNS with Route 53.',
    order: 20,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    content: `# Route 53\n\nManaged DNS service.`,
    codeExamples: [{ title: 'Record Types', code: `// A: IPv4, AAAA: IPv6, CNAME: Alias, MX: Email`, explanation: 'Common DNS records.' }],
    challenge: { starterCode: `// Define DNS record`, solution: `const record = { name: 'api.example.com', type: 'A', alias: { hostedZoneId: 'Z2...', dnsName: 'd123.cloudfront.net' } };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Use alias for CloudFront'] }
  },
  {
    id: 'aws-21',
    slug: 'cloudwatch',
    title: 'CloudWatch Monitoring',
    description: 'Monitor applications with CloudWatch.',
    order: 21,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `# CloudWatch\n\nLogs, metrics, and alarms.`,
    codeExamples: [{ title: 'Custom Metrics', code: `import { CloudWatchClient, PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';`, explanation: 'Publish metrics.' }],
    challenge: { starterCode: `// Create alarm config`, solution: `const alarm = { name: 'HighCPU', metric: 'CPUUtilization', threshold: 80, period: 300 };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Period in seconds'] }
  },
  {
    id: 'aws-22',
    slug: 'secrets-manager',
    title: 'Secrets Manager',
    description: 'Securely store and retrieve secrets.',
    order: 22,
    category: 'aws',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    content: `# Secrets Manager\n\nManage sensitive data.`,
    codeExamples: [{ title: 'Get Secret', code: `import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';`, explanation: 'Retrieve secrets.' }],
    challenge: { starterCode: `// Create secret getter`, solution: `async function getSecret(name) { const client = new SecretsManagerClient({}); const response = await client.send(new GetSecretValueCommand({ SecretId: name })); return JSON.parse(response.SecretString); }`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Parse JSON from SecretString'] }
  },
  {
    id: 'aws-23',
    slug: 'infrastructure-as-code',
    title: 'Infrastructure as Code',
    description: 'Define infrastructure with CloudFormation and CDK.',
    order: 23,
    category: 'aws',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `# Infrastructure as Code\n\nCloudFormation and AWS CDK.`,
    codeExamples: [{ title: 'CDK Stack', code: `import * as cdk from 'aws-cdk-lib';\nimport * as s3 from 'aws-cdk-lib/aws-s3';`, explanation: 'TypeScript CDK.' }],
    challenge: { starterCode: `// Define CDK stack`, solution: `class MyStack extends cdk.Stack { constructor(scope, id) { super(scope, id); new s3.Bucket(this, 'MyBucket'); } }`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Extend cdk.Stack'] }
  },
  {
    id: 'aws-24',
    slug: 'cicd-aws',
    title: 'CI/CD on AWS',
    description: 'Build deployment pipelines with CodePipeline.',
    order: 24,
    category: 'aws',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    content: `# CI/CD on AWS\n\nCodePipeline, CodeBuild, CodeDeploy.`,
    codeExamples: [{ title: 'buildspec.yml', code: `version: 0.2\nphases:\n  build:\n    commands:\n      - npm ci\n      - npm run build`, explanation: 'CodeBuild spec.' }],
    challenge: { starterCode: `// Define pipeline stages`, solution: `const stages = ['Source', 'Build', 'Test', 'Deploy'];`, tests: [{ input: 'stages.length', expected: '4', description: 'Should have 4 stages' }], hints: ['Standard pipeline flow'] }
  }
];

// Export all AWS lessons
export const allAwsLessons: Lesson[] = [
  ...awsFundamentals,
  ...awsServerless,
  ...awsProduction
];
