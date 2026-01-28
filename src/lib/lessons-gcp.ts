import { Lesson } from './lessons';

// GCP Fundamentals (8 lessons)
export const gcpFundamentals: Lesson[] = [
  {
    id: 'gcp-1',
    slug: 'introduction-to-gcp',
    title: 'Introduction to Google Cloud',
    description: 'Learn GCP fundamentals, regions, and core services.',
    order: 1,
    category: 'gcp',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    content: `
# Introduction to Google Cloud

Google Cloud Platform (GCP) provides cloud computing services.

## Key Concepts

- **Projects**: Container for resources
- **Regions**: Geographic locations
- **Zones**: Data centers within regions

## Core Services

| Service | Purpose |
|---------|---------|
| Compute Engine | Virtual machines |
| Cloud Storage | Object storage |
| Cloud SQL | Managed databases |
| Cloud Functions | Serverless functions |
| Cloud Run | Containerized apps |

## Free Tier

$300 credit for 90 days + always-free tier.
    `,
    codeExamples: [
      {
        title: 'GCP SDK Setup',
        code: `// Install: npm install @google-cloud/storage
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'my-project-id',
  keyFilename: './service-account.json'
});

async function listBuckets() {
  const [buckets] = await storage.getBuckets();
  buckets.forEach(bucket => console.log(bucket.name));
}`,
        explanation: 'Basic GCP SDK setup for Cloud Storage.'
      }
    ],
    challenge: {
      starterCode: `const gcpServices = {
  ComputeEngine: '',
  CloudStorage: '',
  CloudFunctions: '',
  CloudSQL: '',
  CloudRun: ''
};`,
      solution: `const gcpServices = {
  ComputeEngine: 'Virtual machines',
  CloudStorage: 'Object storage',
  CloudFunctions: 'Serverless functions',
  CloudSQL: 'Managed databases',
  CloudRun: 'Containerized apps'
};`,
      tests: [
        { input: 'gcpServices.CloudStorage', expected: 'Object storage', description: 'Cloud Storage is object storage' }
      ],
      hints: ['Compute Engine = VMs', 'Cloud Run = containers']
    }
  },
  {
    id: 'gcp-2',
    slug: 'iam-security',
    title: 'IAM and Security',
    description: 'Manage GCP identity, access, and security.',
    order: 2,
    category: 'gcp',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    content: `
# IAM and Security

Control access to GCP resources.

## Key Components

- **Members**: Users, service accounts, groups
- **Roles**: Sets of permissions
- **Policies**: Bindings of members to roles

## Role Types

- **Primitive**: Owner, Editor, Viewer
- **Predefined**: Service-specific (roles/storage.admin)
- **Custom**: User-defined permissions

## Service Accounts

For application authentication:

\`\`\`bash
gcloud iam service-accounts create my-service \\
  --display-name="My Service Account"
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Service Account Authentication',
        code: `// Using service account key file
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: './service-account-key.json'
});

// Or using Application Default Credentials (ADC)
// Set GOOGLE_APPLICATION_CREDENTIALS env var
const storage2 = new Storage();

// In Cloud Run/Functions, uses default service account automatically`,
        explanation: 'Different ways to authenticate with GCP.'
      }
    ],
    challenge: {
      starterCode: `// Create IAM policy for Cloud Storage access
const policy = {
  bindings: [
    // Allow developers to read/write
    // Allow CI to only read
  ]
};`,
      solution: `const policy = {
  bindings: [
    {
      role: 'roles/storage.objectAdmin',
      members: ['group:developers@company.com']
    },
    {
      role: 'roles/storage.objectViewer',
      members: ['serviceAccount:ci@project.iam.gserviceaccount.com']
    }
  ]
};`,
      tests: [
        { input: 'policy.bindings.length', expected: '2', description: 'Should have 2 bindings' }
      ],
      hints: ['objectAdmin for read/write', 'objectViewer for read only']
    }
  },
  {
    id: 'gcp-3',
    slug: 'gcloud-cli',
    title: 'gcloud CLI',
    description: 'Master the Google Cloud command line interface.',
    order: 3,
    category: 'gcp',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    content: `
# gcloud CLI

Command line interface for Google Cloud.

## Installation & Setup

\`\`\`bash
# Install
brew install google-cloud-sdk

# Initialize
gcloud init

# Set project
gcloud config set project my-project
\`\`\`

## Common Commands

\`\`\`bash
# List resources
gcloud compute instances list
gcloud storage ls

# Create resources
gcloud compute instances create my-vm --zone=us-central1-a
gcloud storage buckets create gs://my-bucket

# Deploy
gcloud run deploy --source .
gcloud functions deploy myFunc --runtime nodejs20
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Deployment Script',
        code: `#!/bin/bash
# deploy.sh

PROJECT_ID="my-project"
REGION="us-central1"
SERVICE="my-api"

# Set project
gcloud config set project $PROJECT_ID

# Build and push container
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE

# Deploy to Cloud Run
gcloud run deploy $SERVICE \\
  --image gcr.io/$PROJECT_ID/$SERVICE \\
  --region $REGION \\
  --platform managed \\
  --allow-unauthenticated

echo "Deployed to: https://$SERVICE-xxx.run.app"`,
        explanation: 'Bash script for Cloud Run deployment.'
      }
    ],
    challenge: {
      starterCode: `const gcloudCommands = {
  listBuckets: '',
  createBucket: '',
  copyFile: ''
};`,
      solution: `const gcloudCommands = {
  listBuckets: 'gcloud storage ls',
  createBucket: 'gcloud storage buckets create gs://my-bucket',
  copyFile: 'gcloud storage cp file.txt gs://my-bucket/'
};`,
      tests: [
        { input: 'gcloudCommands.listBuckets', expected: 'gcloud storage ls', description: 'List buckets command' }
      ],
      hints: ['Use gcloud storage for Cloud Storage', 'gs:// prefix for bucket URLs']
    }
  },
  {
    id: 'gcp-4',
    slug: 'cloud-storage',
    title: 'Cloud Storage',
    description: 'Store and manage objects in Cloud Storage.',
    order: 4,
    category: 'gcp',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    content: `
# Cloud Storage

Scalable object storage on GCP.

## Storage Classes

- **Standard**: Frequently accessed data
- **Nearline**: Access < 1/month
- **Coldline**: Access < 1/quarter
- **Archive**: Access < 1/year

## Operations

\`\`\`javascript
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

// Upload
await storage.bucket('my-bucket').upload('local-file.txt');

// Download
await storage.bucket('my-bucket').file('file.txt').download({
  destination: 'local-file.txt'
});

// Generate signed URL
const [url] = await storage.bucket('my-bucket')
  .file('file.txt')
  .getSignedUrl({ action: 'read', expires: Date.now() + 3600000 });
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Cloud Storage Operations',
        code: `const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucket = storage.bucket('my-bucket');

// Upload JSON
async function uploadJSON(filename, data) {
  const file = bucket.file(filename);
  await file.save(JSON.stringify(data), {
    contentType: 'application/json',
    metadata: { cacheControl: 'public, max-age=3600' }
  });
}

// List files
async function listFiles(prefix) {
  const [files] = await bucket.getFiles({ prefix });
  return files.map(f => f.name);
}

// Delete file
async function deleteFile(filename) {
  await bucket.file(filename).delete();
}`,
        explanation: 'Common Cloud Storage operations.'
      }
    ],
    challenge: {
      starterCode: `const { Storage } = require('@google-cloud/storage');

async function copyBetweenBuckets(sourceBucket, destBucket, filename) {
  // Copy file from source to destination bucket
  // Your code here
}`,
      solution: `const { Storage } = require('@google-cloud/storage');

async function copyBetweenBuckets(sourceBucket, destBucket, filename) {
  const storage = new Storage();
  await storage
    .bucket(sourceBucket)
    .file(filename)
    .copy(storage.bucket(destBucket).file(filename));
}`,
      tests: [
        { input: 'typeof copyBetweenBuckets', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use file.copy() method', 'Destination is another file reference']
    }
  },
  {
    id: 'gcp-5',
    slug: 'cloud-storage-advanced',
    title: 'Cloud Storage Advanced',
    description: 'Master lifecycle policies, versioning, and signed URLs.',
    order: 5,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Cloud Storage Advanced

## Object Versioning

Keep multiple versions of objects:

\`\`\`javascript
// Enable versioning
await bucket.setMetadata({ versioning: { enabled: true } });
\`\`\`

## Lifecycle Rules

Automate object management:

\`\`\`json
{
  "lifecycle": {
    "rule": [{
      "action": { "type": "SetStorageClass", "storageClass": "NEARLINE" },
      "condition": { "age": 30 }
    }, {
      "action": { "type": "Delete" },
      "condition": { "age": 365 }
    }]
  }
}
\`\`\`

## Signed URLs

Temporary access to private objects.
    `,
    codeExamples: [
      {
        title: 'Signed URL for Upload',
        code: `const { Storage } = require('@google-cloud/storage');

async function getUploadUrl(bucket, filename, contentType) {
  const storage = new Storage();
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType
  };

  const [url] = await storage
    .bucket(bucket)
    .file(filename)
    .getSignedUrl(options);

  return url;
}

// Client can upload directly to this URL
// fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': contentType } })`,
        explanation: 'Generate signed URL for direct uploads.'
      }
    ],
    challenge: {
      starterCode: `// Create lifecycle rules configuration
const lifecycleRules = {
  rule: [
    // Move to Nearline after 30 days
    // Move to Coldline after 90 days
    // Delete after 365 days
  ]
};`,
      solution: `const lifecycleRules = {
  rule: [
    {
      action: { type: 'SetStorageClass', storageClass: 'NEARLINE' },
      condition: { age: 30 }
    },
    {
      action: { type: 'SetStorageClass', storageClass: 'COLDLINE' },
      condition: { age: 90 }
    },
    {
      action: { type: 'Delete' },
      condition: { age: 365 }
    }
  ]
};`,
      tests: [
        { input: 'lifecycleRules.rule.length', expected: '3', description: 'Should have 3 rules' }
      ],
      hints: ['Use SetStorageClass for transitions', 'Delete action for removal']
    }
  },
  {
    id: 'gcp-6',
    slug: 'compute-engine',
    title: 'Compute Engine',
    description: 'Launch and manage virtual machines.',
    order: 6,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# Compute Engine

Virtual machines on Google Cloud.

## Machine Types

| Family | Use Case |
|--------|----------|
| e2 | Cost-optimized |
| n2/n2d | General purpose |
| c2/c2d | Compute-intensive |
| m2 | Memory-intensive |
| a2 | GPU workloads |

## Creating VMs

\`\`\`bash
gcloud compute instances create my-vm \\
  --zone=us-central1-a \\
  --machine-type=e2-medium \\
  --image-family=debian-11 \\
  --image-project=debian-cloud
\`\`\`

## Startup Scripts

Automate VM configuration on boot.
    `,
    codeExamples: [
      {
        title: 'VM with Startup Script',
        code: `const compute = require('@google-cloud/compute');

async function createVM() {
  const instancesClient = new compute.InstancesClient();

  const [operation] = await instancesClient.insert({
    project: 'my-project',
    zone: 'us-central1-a',
    instanceResource: {
      name: 'web-server',
      machineType: 'zones/us-central1-a/machineTypes/e2-medium',
      disks: [{
        boot: true,
        initializeParams: {
          sourceImage: 'projects/debian-cloud/global/images/family/debian-11'
        }
      }],
      networkInterfaces: [{
        network: 'global/networks/default',
        accessConfigs: [{ name: 'External NAT', type: 'ONE_TO_ONE_NAT' }]
      }],
      metadata: {
        items: [{
          key: 'startup-script',
          value: '#!/bin/bash\\napt-get update\\napt-get install -y nginx'
        }]
      }
    }
  });

  return operation;
}`,
        explanation: 'Create VM with startup script using Node.js SDK.'
      }
    ],
    challenge: {
      starterCode: `// Create firewall rule configuration
// Allow HTTP (80) and HTTPS (443) from anywhere

const firewallRule = {
  name: 'allow-http-https',
  allowed: [],
  sourceRanges: [],
  targetTags: []
};`,
      solution: `const firewallRule = {
  name: 'allow-http-https',
  allowed: [
    { IPProtocol: 'tcp', ports: ['80'] },
    { IPProtocol: 'tcp', ports: ['443'] }
  ],
  sourceRanges: ['0.0.0.0/0'],
  targetTags: ['http-server', 'https-server']
};`,
      tests: [
        { input: 'firewallRule.allowed.length', expected: '2', description: 'Should have 2 rules' }
      ],
      hints: ['sourceRanges 0.0.0.0/0 means anywhere', 'Use targetTags to apply to specific VMs']
    }
  },
  {
    id: 'gcp-7',
    slug: 'compute-engine-advanced',
    title: 'Compute Engine Advanced',
    description: 'Master instance groups, load balancing, and autoscaling.',
    order: 7,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Compute Engine Advanced

## Instance Groups

- **Managed**: Auto-healing, autoscaling
- **Unmanaged**: Manual management

## Instance Templates

Blueprint for creating identical VMs.

## Load Balancing

- HTTP(S) Load Balancer
- TCP/UDP Load Balancer
- Internal Load Balancer

## Autoscaling

\`\`\`bash
gcloud compute instance-groups managed set-autoscaling my-group \\
  --max-num-replicas=10 \\
  --target-cpu-utilization=0.70 \\
  --cool-down-period=60
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Managed Instance Group',
        code: `const compute = require('@google-cloud/compute');

async function createManagedInstanceGroup() {
  // Create instance template first
  const templatesClient = new compute.InstanceTemplatesClient();
  await templatesClient.insert({
    project: 'my-project',
    instanceTemplateResource: {
      name: 'web-template',
      properties: {
        machineType: 'e2-medium',
        disks: [{
          boot: true,
          initializeParams: {
            sourceImage: 'projects/debian-cloud/global/images/family/debian-11'
          }
        }],
        networkInterfaces: [{ network: 'global/networks/default' }]
      }
    }
  });

  // Create managed instance group
  const groupsClient = new compute.InstanceGroupManagersClient();
  await groupsClient.insert({
    project: 'my-project',
    zone: 'us-central1-a',
    instanceGroupManagerResource: {
      name: 'web-group',
      instanceTemplate: 'global/instanceTemplates/web-template',
      targetSize: 2
    }
  });
}`,
        explanation: 'Creating a managed instance group with template.'
      }
    ],
    challenge: {
      starterCode: `// Define autoscaling configuration
const autoscalingConfig = {
  minReplicas: 0,
  maxReplicas: 0,
  cpuUtilization: { target: 0 },
  coolDownPeriodSec: 0
};`,
      solution: `const autoscalingConfig = {
  minReplicas: 2,
  maxReplicas: 10,
  cpuUtilization: { target: 0.7 },
  coolDownPeriodSec: 60
};`,
      tests: [
        { input: 'autoscalingConfig.maxReplicas', expected: '10', description: 'Max should be 10' }
      ],
      hints: ['target is a decimal (0.7 = 70%)', 'coolDownPeriod in seconds']
    }
  },
  {
    id: 'gcp-8',
    slug: 'vpc-networking',
    title: 'VPC Networking',
    description: 'Design networks with VPC, subnets, and firewalls.',
    order: 8,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# VPC Networking

## VPC Concepts

- **VPC**: Global resource spanning regions
- **Subnets**: Regional resources within VPC
- **Routes**: Traffic routing rules
- **Firewall Rules**: Allow/deny traffic

## Creating a VPC

\`\`\`bash
gcloud compute networks create my-vpc --subnet-mode=custom

gcloud compute networks subnets create my-subnet \\
  --network=my-vpc \\
  --region=us-central1 \\
  --range=10.0.0.0/24
\`\`\`

## Private Google Access

Allow VMs without external IPs to access Google APIs.
    `,
    codeExamples: [
      {
        title: 'VPC with Private Subnet',
        code: `// Using gcloud CLI for VPC setup
const commands = \`
# Create VPC
gcloud compute networks create prod-vpc --subnet-mode=custom

# Create public subnet
gcloud compute networks subnets create public-subnet \\
  --network=prod-vpc \\
  --region=us-central1 \\
  --range=10.0.1.0/24

# Create private subnet with Private Google Access
gcloud compute networks subnets create private-subnet \\
  --network=prod-vpc \\
  --region=us-central1 \\
  --range=10.0.2.0/24 \\
  --enable-private-ip-google-access

# Cloud NAT for private subnet outbound
gcloud compute routers create nat-router \\
  --network=prod-vpc \\
  --region=us-central1

gcloud compute routers nats create nat-config \\
  --router=nat-router \\
  --region=us-central1 \\
  --nat-all-subnet-ip-ranges \\
  --auto-allocate-nat-external-ips
\`;`,
        explanation: 'Complete VPC setup with private subnet and Cloud NAT.'
      }
    ],
    challenge: {
      starterCode: `// Design VPC CIDR scheme
const vpcDesign = {
  vpcName: 'production-vpc',
  region: 'us-central1',
  publicSubnet: '',
  privateSubnet: '',
  databaseSubnet: ''
};`,
      solution: `const vpcDesign = {
  vpcName: 'production-vpc',
  region: 'us-central1',
  publicSubnet: '10.0.1.0/24',
  privateSubnet: '10.0.2.0/24',
  databaseSubnet: '10.0.3.0/24'
};`,
      tests: [
        { input: 'vpcDesign.publicSubnet', expected: '10.0.1.0/24', description: 'Should have /24 subnets' }
      ],
      hints: ['/24 provides 256 IPs', 'Use non-overlapping ranges']
    }
  }
];

// GCP Serverless (8 lessons)
export const gcpServerless: Lesson[] = [
  {
    id: 'gcp-9',
    slug: 'cloud-functions',
    title: 'Cloud Functions',
    description: 'Create serverless functions on Google Cloud.',
    order: 9,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Cloud Functions

Event-driven serverless compute.

## Triggers

- HTTP
- Cloud Storage
- Pub/Sub
- Firestore
- Firebase

## Function Types

**1st Gen**: Simpler, established
**2nd Gen**: Based on Cloud Run, more features

## HTTP Function

\`\`\`javascript
exports.helloWorld = (req, res) => {
  res.send('Hello World!');
};
\`\`\`
    `,
    codeExamples: [
      {
        title: 'HTTP Function with TypeScript',
        code: `import { HttpFunction } from '@google-cloud/functions-framework';

interface User {
  id: string;
  name: string;
  email: string;
}

export const createUser: HttpFunction = async (req, res) => {
  // CORS
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: 'Name and email required' });
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      name,
      email
    };

    // Save to database...

    res.status(201).json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};`,
        explanation: 'TypeScript Cloud Function with CORS and validation.'
      }
    ],
    challenge: {
      starterCode: `// Create a Cloud Function triggered by Storage
// When file uploaded to bucket, log file details

exports.processUpload = (event, context) => {
  // event contains file info
  // Log bucket, name, contentType, size
  // Your code here
};`,
      solution: `exports.processUpload = (event, context) => {
  const file = event;

  console.log('File uploaded:', {
    bucket: file.bucket,
    name: file.name,
    contentType: file.contentType,
    size: file.size,
    timeCreated: file.timeCreated
  });

  // Process file...
  return Promise.resolve();
};`,
      tests: [
        { input: 'typeof exports.processUpload', expected: 'function', description: 'Should export function' }
      ],
      hints: ['event object contains file metadata', 'Return a Promise for async operations']
    }
  },
  {
    id: 'gcp-10',
    slug: 'cloud-functions-advanced',
    title: 'Cloud Functions Advanced',
    description: 'Master environment variables, secrets, and optimization.',
    order: 10,
    category: 'gcp',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    content: `
# Cloud Functions Advanced

## Environment Variables

\`\`\`bash
gcloud functions deploy myFunc \\
  --set-env-vars DB_HOST=localhost,DB_PORT=5432
\`\`\`

## Secrets

\`\`\`bash
gcloud functions deploy myFunc \\
  --set-secrets 'API_KEY=projects/123/secrets/api-key:latest'
\`\`\`

## Cold Starts

Minimize with:
- Smaller packages
- Global connections
- Min instances (2nd gen)

## Concurrency

2nd gen supports multiple concurrent requests per instance.
    `,
    codeExamples: [
      {
        title: 'Optimized Function with Connection Pooling',
        code: `const { Firestore } = require('@google-cloud/firestore');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// Initialize outside handler (reused across invocations)
let firestore;
let apiKey;

async function initialize() {
  if (!firestore) {
    firestore = new Firestore();
  }

  if (!apiKey) {
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
      name: process.env.API_KEY_SECRET
    });
    apiKey = version.payload.data.toString();
  }
}

exports.handler = async (req, res) => {
  await initialize();

  const doc = await firestore.collection('items').doc(req.query.id).get();

  if (!doc.exists) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  res.json(doc.data());
};`,
        explanation: 'Function with lazy initialization for better cold start performance.'
      }
    ],
    challenge: {
      starterCode: `// Create a middleware wrapper for Cloud Functions
function withMiddleware(handler) {
  return async (req, res) => {
    // Add CORS headers
    // Parse JSON body
    // Catch errors
    // Your code here
  };
}`,
      solution: `function withMiddleware(handler) {
  return async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}`,
      tests: [
        { input: 'typeof withMiddleware', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Handle OPTIONS for preflight', 'Wrap handler in try/catch']
    }
  },
  {
    id: 'gcp-11',
    slug: 'cloud-run',
    title: 'Cloud Run',
    description: 'Deploy containerized applications to Cloud Run.',
    order: 11,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# Cloud Run

Fully managed containerized applications.

## Features

- Scale to zero
- Automatic HTTPS
- Custom domains
- Traffic splitting
- Revisions

## Deployment

\`\`\`bash
# From source
gcloud run deploy my-service --source .

# From container
gcloud run deploy my-service \\
  --image gcr.io/my-project/my-service \\
  --platform managed \\
  --region us-central1
\`\`\`

## Configuration

- Memory/CPU allocation
- Concurrency limits
- Environment variables
- Secrets
    `,
    codeExamples: [
      {
        title: 'Cloud Run Dockerfile',
        code: `# Dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Cloud Run expects PORT env var
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]

# server.js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/api/items', async (req, res) => {
  const items = await getItems();
  res.json(items);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`,
        explanation: 'Complete Cloud Run setup with Dockerfile and Express server.'
      }
    ],
    challenge: {
      starterCode: `// Create a health check endpoint for Cloud Run
// Should return status and version

const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  // Return health status object
  // Your code here
});

module.exports = app;`,
      solution: `const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: process.env.K_REVISION || 'local',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;`,
      tests: [
        { input: 'typeof app', expected: 'function', description: 'Should export express app' }
      ],
      hints: ['K_REVISION is set by Cloud Run', 'Include timestamp for monitoring']
    }
  },
  {
    id: 'gcp-12',
    slug: 'cloud-run-cloud-build',
    title: 'Cloud Run + Cloud Build',
    description: 'Set up CI/CD for Cloud Run with Cloud Build.',
    order: 12,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Cloud Run + Cloud Build

Automated deployments with Cloud Build.

## cloudbuild.yaml

\`\`\`yaml
steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/my-service', '.']

  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/my-service']

  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    args:
      - 'run'
      - 'deploy'
      - 'my-service'
      - '--image'
      - 'gcr.io/$PROJECT_ID/my-service'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
\`\`\`

## Triggers

- GitHub/Cloud Source Repos push
- Manual
- Scheduled
    `,
    codeExamples: [
      {
        title: 'Complete CI/CD Pipeline',
        code: `# cloudbuild.yaml
steps:
  # Run tests
  - name: 'node:20'
    entrypoint: 'npm'
    args: ['ci']

  - name: 'node:20'
    entrypoint: 'npm'
    args: ['test']

  # Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/\${_SERVICE_NAME}:\${SHORT_SHA}'
      - '-t'
      - 'gcr.io/$PROJECT_ID/\${_SERVICE_NAME}:latest'
      - '.'

  # Push images
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', '--all-tags', 'gcr.io/$PROJECT_ID/\${_SERVICE_NAME}']

  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    args:
      - 'run'
      - 'deploy'
      - '\${_SERVICE_NAME}'
      - '--image'
      - 'gcr.io/$PROJECT_ID/\${_SERVICE_NAME}:\${SHORT_SHA}'
      - '--region'
      - '\${_REGION}'
      - '--platform'
      - 'managed'
      - '--set-env-vars'
      - 'VERSION=\${SHORT_SHA}'

substitutions:
  _SERVICE_NAME: my-api
  _REGION: us-central1

options:
  logging: CLOUD_LOGGING_ONLY`,
        explanation: 'Full CI/CD pipeline with tests, build, and deployment.'
      }
    ],
    challenge: {
      starterCode: `// Create cloudbuild.yaml steps for:
// 1. Install dependencies
// 2. Run linter
// 3. Run tests
// 4. Build image
// 5. Deploy to Cloud Run

const buildSteps = [
  // Your steps here
];`,
      solution: `const buildSteps = [
  { name: 'node:20', entrypoint: 'npm', args: ['ci'] },
  { name: 'node:20', entrypoint: 'npm', args: ['run', 'lint'] },
  { name: 'node:20', entrypoint: 'npm', args: ['test'] },
  { name: 'gcr.io/cloud-builders/docker', args: ['build', '-t', 'gcr.io/$PROJECT_ID/app', '.'] },
  { name: 'gcr.io/google.com/cloudsdktool/cloud-sdk', args: ['run', 'deploy', 'app', '--image', 'gcr.io/$PROJECT_ID/app', '--region', 'us-central1'] }
];`,
      tests: [
        { input: 'buildSteps.length', expected: '5', description: 'Should have 5 steps' }
      ],
      hints: ['Use node:20 for npm commands', 'cloud-sdk for gcloud commands']
    }
  },
  {
    id: 'gcp-13',
    slug: 'firestore',
    title: 'Firestore',
    description: 'Work with Firestore document database.',
    order: 13,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    content: `
# Firestore

NoSQL document database.

## Data Model

- **Collections**: Groups of documents
- **Documents**: JSON-like records
- **Subcollections**: Nested collections

## Operations

\`\`\`javascript
const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

// Create
await db.collection('users').doc('user1').set({ name: 'John' });

// Read
const doc = await db.collection('users').doc('user1').get();

// Update
await db.collection('users').doc('user1').update({ age: 30 });

// Delete
await db.collection('users').doc('user1').delete();

// Query
const snapshot = await db.collection('users')
  .where('age', '>', 25)
  .orderBy('age')
  .limit(10)
  .get();
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Firestore CRUD Operations',
        code: `const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();

class UserService {
  constructor() {
    this.collection = db.collection('users');
  }

  async create(data) {
    const docRef = await this.collection.add({
      ...data,
      createdAt: Firestore.Timestamp.now()
    });
    return { id: docRef.id, ...data };
  }

  async findById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async findByEmail(email) {
    const snapshot = await this.collection
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async update(id, data) {
    await this.collection.doc(id).update({
      ...data,
      updatedAt: Firestore.Timestamp.now()
    });
    return this.findById(id);
  }

  async delete(id) {
    await this.collection.doc(id).delete();
  }
}`,
        explanation: 'Complete Firestore service class with CRUD operations.'
      }
    ],
    challenge: {
      starterCode: `const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

// Create a function to get paginated results
async function getPaginated(collection, pageSize, lastDoc = null) {
  // Query with limit
  // If lastDoc provided, start after it
  // Return { items, lastDoc }
  // Your code here
}`,
      solution: `const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

async function getPaginated(collection, pageSize, lastDoc = null) {
  let query = db.collection(collection)
    .orderBy('createdAt', 'desc')
    .limit(pageSize);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  const snapshot = await query.get();
  const items = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

  return { items, lastDoc: newLastDoc };
}`,
      tests: [
        { input: 'typeof getPaginated', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use startAfter for pagination', 'Return last doc for next page']
    }
  },
  {
    id: 'gcp-14',
    slug: 'firestore-advanced',
    title: 'Firestore Advanced',
    description: 'Master transactions, security rules, and real-time listeners.',
    order: 14,
    category: 'gcp',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `
# Firestore Advanced

## Transactions

Atomic operations across documents:

\`\`\`javascript
await db.runTransaction(async (transaction) => {
  const fromDoc = await transaction.get(fromRef);
  const toDoc = await transaction.get(toRef);

  transaction.update(fromRef, { balance: fromDoc.data().balance - amount });
  transaction.update(toRef, { balance: toDoc.data().balance + amount });
});
\`\`\`

## Batched Writes

Multiple writes atomically:

\`\`\`javascript
const batch = db.batch();
batch.set(ref1, data1);
batch.update(ref2, data2);
batch.delete(ref3);
await batch.commit();
\`\`\`

## Security Rules

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Transaction Example',
        code: `const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

async function transferCredits(fromUserId, toUserId, amount) {
  const fromRef = db.collection('users').doc(fromUserId);
  const toRef = db.collection('users').doc(toUserId);

  await db.runTransaction(async (transaction) => {
    const fromDoc = await transaction.get(fromRef);
    const toDoc = await transaction.get(toRef);

    if (!fromDoc.exists || !toDoc.exists) {
      throw new Error('User not found');
    }

    const fromBalance = fromDoc.data().credits;
    if (fromBalance < amount) {
      throw new Error('Insufficient credits');
    }

    transaction.update(fromRef, {
      credits: fromBalance - amount
    });
    transaction.update(toRef, {
      credits: toDoc.data().credits + amount
    });

    // Record the transfer
    const transferRef = db.collection('transfers').doc();
    transaction.set(transferRef, {
      from: fromUserId,
      to: toUserId,
      amount,
      timestamp: Firestore.Timestamp.now()
    });
  });
}`,
        explanation: 'Atomic credit transfer with transaction.'
      }
    ],
    challenge: {
      starterCode: `// Create a batch operation to:
// 1. Create a new order
// 2. Update inventory for each item
// 3. Update user's order count

async function createOrderBatch(db, userId, orderData, items) {
  const batch = db.batch();
  // Your code here
  // await batch.commit();
}`,
      solution: `async function createOrderBatch(db, userId, orderData, items) {
  const batch = db.batch();

  // Create order
  const orderRef = db.collection('orders').doc();
  batch.set(orderRef, {
    ...orderData,
    userId,
    createdAt: Firestore.Timestamp.now()
  });

  // Update inventory
  for (const item of items) {
    const productRef = db.collection('products').doc(item.productId);
    batch.update(productRef, {
      stock: Firestore.FieldValue.increment(-item.quantity)
    });
  }

  // Update user's order count
  const userRef = db.collection('users').doc(userId);
  batch.update(userRef, {
    orderCount: Firestore.FieldValue.increment(1)
  });

  await batch.commit();
  return orderRef.id;
}`,
      tests: [
        { input: 'typeof createOrderBatch', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['Use FieldValue.increment for counters', 'Batch limit is 500 operations']
    }
  },
  {
    id: 'gcp-15',
    slug: 'pub-sub',
    title: 'Cloud Pub/Sub',
    description: 'Build event-driven architectures with Pub/Sub.',
    order: 15,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `
# Cloud Pub/Sub

Asynchronous messaging service.

## Concepts

- **Topic**: Named resource for messages
- **Subscription**: Receives messages from topic
- **Message**: Data + attributes

## Publishing

\`\`\`javascript
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

const topic = pubsub.topic('my-topic');
await topic.publishMessage({
  data: Buffer.from(JSON.stringify({ orderId: '123' })),
  attributes: { type: 'order_created' }
});
\`\`\`

## Subscribing

Push (HTTP) or Pull subscriptions.
    `,
    codeExamples: [
      {
        title: 'Pub/Sub Publisher and Subscriber',
        code: `const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub();

// Publisher
async function publishEvent(topicName, event) {
  const topic = pubsub.topic(topicName);

  const messageId = await topic.publishMessage({
    data: Buffer.from(JSON.stringify(event)),
    attributes: {
      eventType: event.type,
      timestamp: new Date().toISOString()
    }
  });

  console.log('Published:', messageId);
  return messageId;
}

// Pull Subscriber (for Cloud Functions/background workers)
async function pullMessages(subscriptionName, maxMessages = 10) {
  const subscription = pubsub.subscription(subscriptionName);

  const [messages] = await subscription.pull({ maxMessages });

  for (const message of messages) {
    const data = JSON.parse(message.data.toString());
    console.log('Received:', data);

    // Process message...

    // Acknowledge
    message.ack();
  }
}

// Push Subscriber (Cloud Function)
exports.handlePubSub = (event, context) => {
  const data = JSON.parse(Buffer.from(event.data, 'base64').toString());
  console.log('Received:', data);
  // Process...
};`,
        explanation: 'Complete Pub/Sub setup with publish and subscribe patterns.'
      }
    ],
    challenge: {
      starterCode: `const { PubSub } = require('@google-cloud/pubsub');

// Create an event publisher with retry logic
class EventPublisher {
  constructor(topicName) {
    this.pubsub = new PubSub();
    this.topic = this.pubsub.topic(topicName);
  }

  async publish(event, maxRetries = 3) {
    // Publish with retry on failure
    // Your code here
  }
}`,
      solution: `const { PubSub } = require('@google-cloud/pubsub');

class EventPublisher {
  constructor(topicName) {
    this.pubsub = new PubSub();
    this.topic = this.pubsub.topic(topicName);
  }

  async publish(event, maxRetries = 3) {
    let lastError;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const messageId = await this.topic.publishMessage({
          data: Buffer.from(JSON.stringify(event)),
          attributes: { eventType: event.type || 'unknown' }
        });
        return { success: true, messageId };
      } catch (error) {
        lastError = error;
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 100));
      }
    }

    return { success: false, error: lastError.message };
  }
}`,
      tests: [
        { input: 'typeof EventPublisher', expected: 'function', description: 'Should be a class' }
      ],
      hints: ['Use exponential backoff', 'Return success status']
    }
  },
  {
    id: 'gcp-16',
    slug: 'cloud-tasks',
    title: 'Cloud Tasks',
    description: 'Schedule and manage task execution.',
    order: 16,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `
# Cloud Tasks

Asynchronous task execution.

## Features

- HTTP/App Engine targets
- Rate limiting
- Retry configuration
- Scheduled execution

## Creating Tasks

\`\`\`javascript
const { CloudTasksClient } = require('@google-cloud/tasks');

const client = new CloudTasksClient();

const task = {
  httpRequest: {
    httpMethod: 'POST',
    url: 'https://my-service.run.app/process',
    body: Buffer.from(JSON.stringify({ id: '123' })).toString('base64'),
    headers: { 'Content-Type': 'application/json' }
  },
  scheduleTime: { seconds: Date.now() / 1000 + 300 } // 5 min delay
};

await client.createTask({
  parent: 'projects/my-project/locations/us-central1/queues/my-queue',
  task
});
\`\`\`
    `,
    codeExamples: [
      {
        title: 'Task Queue Service',
        code: `const { CloudTasksClient } = require('@google-cloud/tasks');

class TaskQueue {
  constructor(project, location, queue) {
    this.client = new CloudTasksClient();
    this.parent = \`projects/\${project}/locations/\${location}/queues/\${queue}\`;
  }

  async enqueue(url, payload, delaySeconds = 0) {
    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        body: Buffer.from(JSON.stringify(payload)).toString('base64'),
        headers: { 'Content-Type': 'application/json' }
      }
    };

    if (delaySeconds > 0) {
      task.scheduleTime = {
        seconds: Math.floor(Date.now() / 1000) + delaySeconds
      };
    }

    const [response] = await this.client.createTask({
      parent: this.parent,
      task
    });

    return response.name;
  }

  async deleteTask(taskName) {
    await this.client.deleteTask({ name: taskName });
  }
}

// Usage
const queue = new TaskQueue('my-project', 'us-central1', 'email-queue');
await queue.enqueue(
  'https://my-service.run.app/send-email',
  { to: 'user@example.com', template: 'welcome' },
  60 // Delay 60 seconds
);`,
        explanation: 'Task queue service with delayed execution.'
      }
    ],
    challenge: {
      starterCode: `// Create a task scheduler for sending reminder emails
async function scheduleReminder(userId, message, delayMinutes) {
  // Create a task that calls /api/send-reminder
  // Schedule it for delayMinutes in the future
  // Your code here
}`,
      solution: `const { CloudTasksClient } = require('@google-cloud/tasks');

const client = new CloudTasksClient();
const queuePath = 'projects/my-project/locations/us-central1/queues/reminders';

async function scheduleReminder(userId, message, delayMinutes) {
  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url: 'https://my-service.run.app/api/send-reminder',
      body: Buffer.from(JSON.stringify({ userId, message })).toString('base64'),
      headers: { 'Content-Type': 'application/json' }
    },
    scheduleTime: {
      seconds: Math.floor(Date.now() / 1000) + (delayMinutes * 60)
    }
  };

  const [response] = await client.createTask({ parent: queuePath, task });
  return response.name;
}`,
      tests: [
        { input: 'typeof scheduleReminder', expected: 'function', description: 'Should be a function' }
      ],
      hints: ['scheduleTime is in seconds', 'Body must be base64 encoded']
    }
  }
];

// GCP Production (8 lessons) - abbreviated
export const gcpProduction: Lesson[] = [
  {
    id: 'gcp-17',
    slug: 'cloud-sql',
    title: 'Cloud SQL',
    description: 'Deploy managed PostgreSQL and MySQL.',
    order: 17,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `# Cloud SQL\n\nManaged relational databases.`,
    codeExamples: [{ title: 'Connection', code: `const { Pool } = require('pg');\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });`, explanation: 'PostgreSQL connection.' }],
    challenge: { starterCode: `// Configure pool`, solution: `const poolConfig = { max: 5, idleTimeoutMillis: 30000 };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Set max connections'] }
  },
  {
    id: 'gcp-18',
    slug: 'memorystore',
    title: 'Cloud Memorystore',
    description: 'Add caching with managed Redis.',
    order: 18,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    content: `# Memorystore\n\nManaged Redis.`,
    codeExamples: [{ title: 'Redis', code: `const redis = require('redis');\nconst client = redis.createClient({ url: process.env.REDIS_URL });`, explanation: 'Redis setup.' }],
    challenge: { starterCode: `// Cache helper`, solution: `const cache = { get: (k) => client.get(k), set: (k, v, ttl) => client.setEx(k, ttl, v) };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Use setEx'] }
  },
  {
    id: 'gcp-19',
    slug: 'cloud-cdn',
    title: 'Cloud CDN',
    description: 'Accelerate content delivery.',
    order: 19,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    content: `# Cloud CDN\n\nGlobal content delivery.`,
    codeExamples: [{ title: 'Cache Headers', code: `res.set('Cache-Control', 'public, max-age=3600');`, explanation: 'Set cache headers.' }],
    challenge: { starterCode: `// Cache config`, solution: `const cachePolicy = { defaultTtl: 3600, maxTtl: 86400 };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['TTL in seconds'] }
  },
  {
    id: 'gcp-20',
    slug: 'cloud-dns',
    title: 'Cloud DNS',
    description: 'Manage DNS records.',
    order: 20,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    content: `# Cloud DNS\n\nManaged DNS service.`,
    codeExamples: [{ title: 'Record', code: `gcloud dns record-sets create api.example.com --zone=my-zone --type=A --rrdatas=1.2.3.4`, explanation: 'Create DNS record.' }],
    challenge: { starterCode: `// DNS record`, solution: `const record = { name: 'api.example.com', type: 'A', ttl: 300 };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['A records for IPv4'] }
  },
  {
    id: 'gcp-21',
    slug: 'logging-monitoring',
    title: 'Cloud Logging and Monitoring',
    description: 'Monitor applications with Cloud Operations.',
    order: 21,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    content: `# Cloud Logging & Monitoring\n\nObservability for GCP.`,
    codeExamples: [{ title: 'Structured Logging', code: `console.log(JSON.stringify({ severity: 'INFO', message: 'Hello' }));`, explanation: 'Structured logs for Cloud Logging.' }],
    challenge: { starterCode: `// Log entry`, solution: `const logEntry = { severity: 'ERROR', message: 'Failed', error: err.message };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Use severity field'] }
  },
  {
    id: 'gcp-22',
    slug: 'secret-manager',
    title: 'Secret Manager',
    description: 'Securely store and access secrets.',
    order: 22,
    category: 'gcp',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    content: `# Secret Manager\n\nStore sensitive data securely.`,
    codeExamples: [{ title: 'Access Secret', code: `const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');`, explanation: 'Get secrets.' }],
    challenge: { starterCode: `// Get secret`, solution: `async function getSecret(name) { const client = new SecretManagerServiceClient(); const [version] = await client.accessSecretVersion({ name }); return version.payload.data.toString(); }`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Parse payload.data'] }
  },
  {
    id: 'gcp-23',
    slug: 'terraform-gcp',
    title: 'Terraform for GCP',
    description: 'Infrastructure as code with Terraform.',
    order: 23,
    category: 'gcp',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    content: `# Terraform\n\nDefine GCP infrastructure as code.`,
    codeExamples: [{ title: 'GCS Bucket', code: `resource "google_storage_bucket" "bucket" {\n  name = "my-bucket"\n  location = "US"\n}`, explanation: 'Terraform resource.' }],
    challenge: { starterCode: `// Terraform resource`, solution: `const resource = { type: 'google_cloud_run_service', name: 'api' };`, tests: [{ input: 'true', expected: 'true', description: 'Valid' }], hints: ['Use google_ prefix'] }
  },
  {
    id: 'gcp-24',
    slug: 'cloud-build-cicd',
    title: 'Cloud Build CI/CD',
    description: 'Build automated pipelines.',
    order: 24,
    category: 'gcp',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    content: `# Cloud Build\n\nCI/CD on Google Cloud.`,
    codeExamples: [{ title: 'cloudbuild.yaml', code: `steps:\n  - name: 'node:20'\n    args: ['npm', 'test']`, explanation: 'Build config.' }],
    challenge: { starterCode: `// Build steps`, solution: `const steps = [{ name: 'node:20', args: ['npm', 'ci'] }, { name: 'node:20', args: ['npm', 'test'] }];`, tests: [{ input: 'steps.length', expected: '2', description: 'Should have 2 steps' }], hints: ['Install then test'] }
  }
];

// Export all GCP lessons
export const allGcpLessons: Lesson[] = [
  ...gcpFundamentals,
  ...gcpServerless,
  ...gcpProduction
];
