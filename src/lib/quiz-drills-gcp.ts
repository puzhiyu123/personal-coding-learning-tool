import type { QuizDrill } from "./quiz-drills";

export const gcpQuizDrills: QuizDrill[] = [
  // ─── Compute Engine ────────────────────────────────────────────────
  {
    id: "quiz-gcp-compute-engine-01",
    trackId: "gcp",
    category: "Compute Engine",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To create a new VM instance named `web-server` in the `us-central1-a` zone, you run: `gcloud compute instances ____ web-server --zone=us-central1-a`.",
    options: [
      { label: "A", text: "create" },
      { label: "B", text: "deploy" },
      { label: "C", text: "launch" },
      { label: "D", text: "start" },
    ],
    correctAnswer: "A",
    explanation:
      "The `gcloud compute instances create` command provisions a new VM instance. `start` resumes a stopped instance rather than creating one.",
    hint: "Think about the CRUD verb for making a brand-new resource.",
    tags: ["gcp", "compute-engine", "gcloud", "vm"],
  },
  {
    id: "quiz-gcp-compute-engine-02",
    trackId: "gcp",
    category: "Compute Engine",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "You run the following command. What machine type will the created instance use?",
    codeSnippet: `gcloud compute instances create my-vm \\
  --zone=us-central1-a \\
  --machine-type=e2-medium`,
    options: [
      { label: "A", text: "n1-standard-1 (the default)" },
      { label: "B", text: "e2-medium (2 vCPUs, 4 GB memory)" },
      { label: "C", text: "e2-small (2 vCPUs, 2 GB memory)" },
      { label: "D", text: "f1-micro (shared vCPU, 0.6 GB memory)" },
    ],
    correctAnswer: "B",
    explanation:
      "The `--machine-type=e2-medium` flag explicitly sets the machine type. The e2-medium provides 2 vCPUs and 4 GB of memory in the cost-optimized E2 series.",
    hint: "The flag value is used exactly as specified.",
    tags: ["gcp", "compute-engine", "machine-type"],
  },
  {
    id: "quiz-gcp-compute-engine-03",
    trackId: "gcp",
    category: "Compute Engine",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "Which Compute Engine option provides the deepest discount but can be preempted by GCP with a 30-second warning?",
    options: [
      { label: "A", text: "Committed-use discounts" },
      { label: "B", text: "Sustained-use discounts" },
      { label: "C", text: "Spot VMs" },
      { label: "D", text: "Sole-tenant nodes" },
    ],
    correctAnswer: "C",
    explanation:
      "Spot VMs (formerly preemptible VMs) offer up to 60-91% discount but can be reclaimed by Compute Engine at any time. They are ideal for fault-tolerant batch workloads.",
    hint: "These VMs replaced the older 'preemptible' option and are the cheapest tier.",
    tags: ["gcp", "compute-engine", "spot-vm", "cost-optimization"],
  },

  // ─── Cloud Functions ───────────────────────────────────────────────
  {
    id: "quiz-gcp-cloud-functions-01",
    trackId: "gcp",
    category: "Cloud Functions",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To deploy a Cloud Function triggered by HTTP requests, you specify `--trigger-____` in the deploy command.",
    options: [
      { label: "A", text: "http" },
      { label: "B", text: "web" },
      { label: "C", text: "rest" },
      { label: "D", text: "api" },
    ],
    correctAnswer: "A",
    explanation:
      "The `--trigger-http` flag tells Cloud Functions to create an HTTPS endpoint that invokes the function. Other trigger types include `--trigger-topic` and `--trigger-bucket`.",
    hint: "The protocol name used for web requests is also the flag suffix.",
    tags: ["gcp", "cloud-functions", "trigger", "http"],
  },
  {
    id: "quiz-gcp-cloud-functions-02",
    trackId: "gcp",
    category: "Cloud Functions",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "Given the following Cloud Functions deploy command, what event will trigger this function?",
    codeSnippet: `gcloud functions deploy processFile \\
  --runtime=nodejs20 \\
  --trigger-resource=my-upload-bucket \\
  --trigger-event=google.storage.object.finalize`,
    options: [
      { label: "A", text: "When any file in the bucket is deleted" },
      {
        label: "B",
        text: "When a new object is created or overwritten in `my-upload-bucket`",
      },
      { label: "C", text: "When the bucket metadata is updated" },
      { label: "D", text: "When a file in the bucket is moved to another bucket" },
    ],
    correctAnswer: "B",
    explanation:
      "The `google.storage.object.finalize` event fires when a new object is successfully created in the bucket, including overwrites of existing objects.",
    hint: "The word 'finalize' relates to the completion of an upload.",
    tags: ["gcp", "cloud-functions", "cloud-storage", "event-trigger"],
  },
  {
    id: "quiz-gcp-cloud-functions-03",
    trackId: "gcp",
    category: "Cloud Functions",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "Which Cloud Functions generation supports concurrency, allowing a single function instance to handle multiple requests simultaneously?",
    options: [
      { label: "A", text: "1st gen only" },
      { label: "B", text: "2nd gen only" },
      { label: "C", text: "Both 1st and 2nd gen" },
      { label: "D", text: "Neither; concurrency requires Cloud Run" },
    ],
    correctAnswer: "B",
    explanation:
      "Cloud Functions 2nd gen is built on Cloud Run and supports concurrency up to 1000 concurrent requests per instance. 1st gen processes one request per instance at a time.",
    hint: "The newer generation is built on top of another GCP service that already supports concurrency.",
    tags: ["gcp", "cloud-functions", "concurrency", "2nd-gen"],
  },

  // ─── Cloud Storage ─────────────────────────────────────────────────
  {
    id: "quiz-gcp-cloud-storage-01",
    trackId: "gcp",
    category: "Cloud Storage",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To copy a local file `report.csv` into a Cloud Storage bucket, you run: `gsutil ____ report.csv gs://my-bucket/`.",
    options: [
      { label: "A", text: "mv" },
      { label: "B", text: "cp" },
      { label: "C", text: "upload" },
      { label: "D", text: "push" },
    ],
    correctAnswer: "B",
    explanation:
      "The `gsutil cp` command copies files between local and Cloud Storage locations, similar to the Unix `cp` command. `gsutil mv` would move (and delete the source) instead.",
    hint: "The gsutil subcommand mirrors a common Unix file operation.",
    tags: ["gcp", "cloud-storage", "gsutil", "upload"],
  },
  {
    id: "quiz-gcp-cloud-storage-02",
    trackId: "gcp",
    category: "Cloud Storage",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "What will the following lifecycle configuration do to objects in the bucket?",
    codeSnippet: `{
  "lifecycle": {
    "rule": [
      {
        "action": { "type": "SetStorageClass", "storageClass": "NEARLINE" },
        "condition": { "age": 30 }
      },
      {
        "action": { "type": "Delete" },
        "condition": { "age": 365 }
      }
    ]
  }
}`,
    options: [
      { label: "A", text: "Delete all objects after 30 days" },
      {
        label: "B",
        text: "Move objects to Nearline after 30 days, then delete after 365 days",
      },
      {
        label: "C",
        text: "Move objects to Nearline after 365 days, then delete after 30 more days",
      },
      { label: "D", text: "Archive objects to Coldline after 30 days" },
    ],
    correctAnswer: "B",
    explanation:
      "Lifecycle rules are evaluated independently based on object age. At 30 days the storage class changes to Nearline; at 365 days the object is deleted.",
    hint: "Each rule's condition 'age' is measured from the object's creation date.",
    tags: ["gcp", "cloud-storage", "lifecycle", "storage-class"],
  },
  {
    id: "quiz-gcp-cloud-storage-03",
    trackId: "gcp",
    category: "Cloud Storage",
    difficulty: "beginner",
    type: "multiple-choice",
    question:
      "Which Cloud Storage class is best for data accessed less than once a month but needs millisecond access latency when read?",
    options: [
      { label: "A", text: "Standard" },
      { label: "B", text: "Nearline" },
      { label: "C", text: "Coldline" },
      { label: "D", text: "Archive" },
    ],
    correctAnswer: "C",
    explanation:
      "Coldline storage is designed for data accessed at most once a quarter. It still provides millisecond access but has a 90-day minimum storage duration and higher retrieval costs than Nearline.",
    hint: "The name suggests data that is rarely accessed, between warm and frozen.",
    tags: ["gcp", "cloud-storage", "storage-class", "cost-optimization"],
  },
  {
    id: "quiz-gcp-cloud-storage-04",
    trackId: "gcp",
    category: "Cloud Storage",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To make all objects in a bucket publicly readable, you run: `gsutil iam ch ____:objectViewer gs://my-public-bucket`.",
    options: [
      { label: "A", text: "allUsers" },
      { label: "B", text: "public" },
      { label: "C", text: "everyone" },
      { label: "D", text: "anonymous" },
    ],
    correctAnswer: "A",
    explanation:
      "The special principal `allUsers` represents anyone on the internet. Granting `objectViewer` to `allUsers` makes all objects in the bucket publicly readable.",
    hint: "GCP uses a specific principal identifier that literally means 'all users'.",
    tags: ["gcp", "cloud-storage", "iam", "public-access"],
  },

  // ─── IAM ───────────────────────────────────────────────────────────
  {
    id: "quiz-gcp-iam-01",
    trackId: "gcp",
    category: "IAM",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "In GCP IAM, the three components of a policy binding are: a ____, a role, and a condition (optional).",
    options: [
      { label: "A", text: "principal (member)" },
      { label: "B", text: "resource" },
      { label: "C", text: "permission" },
      { label: "D", text: "scope" },
    ],
    correctAnswer: "A",
    explanation:
      "An IAM policy binding connects a principal (member) to a role. The role contains a set of permissions, and the binding optionally includes a condition for conditional access.",
    hint: "This is the 'who' in the 'who can do what on which resource' model.",
    tags: ["gcp", "iam", "policy", "binding"],
  },
  {
    id: "quiz-gcp-iam-02",
    trackId: "gcp",
    category: "IAM",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What does this gcloud command do?",
    codeSnippet: `gcloud projects add-iam-policy-binding my-project \\
  --member="serviceAccount:my-sa@my-project.iam.gserviceaccount.com" \\
  --role="roles/storage.objectAdmin"`,
    options: [
      {
        label: "A",
        text: "Creates a new service account named `my-sa`",
      },
      {
        label: "B",
        text: "Grants the service account `my-sa` full control over all Cloud Storage objects in the project",
      },
      {
        label: "C",
        text: "Grants the service account read-only access to Cloud Storage",
      },
      {
        label: "D",
        text: "Removes the storage.objectAdmin role from the service account",
      },
    ],
    correctAnswer: "B",
    explanation:
      "The `add-iam-policy-binding` command grants the specified role to the member. `roles/storage.objectAdmin` provides full control (create, delete, list, get) over objects in Cloud Storage.",
    hint: "The command is 'add', not 'remove', and objectAdmin is the highest object-level role.",
    tags: ["gcp", "iam", "service-account", "cloud-storage"],
  },
  {
    id: "quiz-gcp-iam-03",
    trackId: "gcp",
    category: "IAM",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "What is the principle of least privilege best practice when assigning IAM roles in GCP?",
    options: [
      {
        label: "A",
        text: "Assign the Owner role at the organization level for simplicity",
      },
      {
        label: "B",
        text: "Use predefined roles at the most specific resource level possible",
      },
      {
        label: "C",
        text: "Use basic roles (Viewer, Editor, Owner) for all service accounts",
      },
      {
        label: "D",
        text: "Grant permissions at the folder level so they inherit everywhere",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Least privilege means granting only the permissions needed and at the narrowest scope. Predefined roles are more granular than basic roles, and applying them at the resource level limits their blast radius.",
    hint: "The answer avoids broad roles and broad scopes.",
    tags: ["gcp", "iam", "best-practices", "least-privilege"],
  },
  {
    id: "quiz-gcp-iam-04",
    trackId: "gcp",
    category: "IAM",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To create a new service account in GCP, you run: `gcloud iam ____-accounts create my-sa --display-name=\"My Service Account\"`.",
    options: [
      { label: "A", text: "service" },
      { label: "B", text: "user" },
      { label: "C", text: "role" },
      { label: "D", text: "api" },
    ],
    correctAnswer: "A",
    explanation:
      "The `gcloud iam service-accounts create` command creates a new service account. Service accounts are special accounts used by applications rather than people.",
    hint: "These accounts are meant for services and applications, not human users.",
    tags: ["gcp", "iam", "service-account", "gcloud"],
  },

  // ─── BigQuery ──────────────────────────────────────────────────────
  {
    id: "quiz-gcp-bigquery-01",
    trackId: "gcp",
    category: "BigQuery",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To run a SQL query in BigQuery from the command line, you use: `bq ____ 'SELECT COUNT(*) FROM my_dataset.my_table'`.",
    options: [
      { label: "A", text: "run" },
      { label: "B", text: "query" },
      { label: "C", text: "exec" },
      { label: "D", text: "sql" },
    ],
    correctAnswer: "B",
    explanation:
      "The `bq query` command executes a SQL query in BigQuery. You can also pass flags like `--use_legacy_sql=false` to use standard SQL syntax.",
    hint: "The subcommand matches the name of the operation you are performing.",
    tags: ["gcp", "bigquery", "bq", "sql"],
  },
  {
    id: "quiz-gcp-bigquery-02",
    trackId: "gcp",
    category: "BigQuery",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What does the following BigQuery SQL query return?",
    codeSnippet: `SELECT
  EXTRACT(YEAR FROM created_at) AS year,
  COUNT(*) AS total_orders
FROM \`my_project.sales.orders\`
WHERE status = 'completed'
GROUP BY year
ORDER BY year DESC
LIMIT 3;`,
    options: [
      { label: "A", text: "All orders grouped by month in ascending order" },
      {
        label: "B",
        text: "The total number of completed orders per year, showing only the 3 most recent years",
      },
      {
        label: "C",
        text: "The 3 oldest completed orders from the sales dataset",
      },
      {
        label: "D",
        text: "All completed orders with their year extracted, limited to 3 rows",
      },
    ],
    correctAnswer: "B",
    explanation:
      "The query extracts the year, filters for completed orders, groups by year, orders descending (most recent first), and limits to 3 results -- giving the top 3 most recent years with their order counts.",
    hint: "Follow the SQL clauses in order: WHERE filters, GROUP BY aggregates, ORDER BY DESC sorts newest first, LIMIT caps results.",
    tags: ["gcp", "bigquery", "sql", "aggregation"],
  },
  {
    id: "quiz-gcp-bigquery-03",
    trackId: "gcp",
    category: "BigQuery",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "In BigQuery, what is the key advantage of using partitioned tables over non-partitioned tables?",
    options: [
      {
        label: "A",
        text: "Partitioned tables support more data types",
      },
      {
        label: "B",
        text: "Queries scan less data when filtered by the partition key, reducing cost and improving performance",
      },
      {
        label: "C",
        text: "Partitioned tables automatically back up data to Cloud Storage",
      },
      {
        label: "D",
        text: "Partitioned tables allow joining with external databases",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Partitioned tables divide data into segments (e.g., by date). When a query filters on the partition column, BigQuery only scans the relevant partitions, dramatically reducing bytes processed and cost.",
    hint: "The benefit relates to how much data the query engine needs to read.",
    tags: ["gcp", "bigquery", "partitioning", "cost-optimization"],
  },

  // ─── Cloud Run ─────────────────────────────────────────────────────
  {
    id: "quiz-gcp-cloud-run-01",
    trackId: "gcp",
    category: "Cloud Run",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To deploy a container image to Cloud Run, you run: `gcloud run ____ my-service --image=gcr.io/my-project/my-app:latest --region=us-central1`.",
    options: [
      { label: "A", text: "create" },
      { label: "B", text: "deploy" },
      { label: "C", text: "push" },
      { label: "D", text: "start" },
    ],
    correctAnswer: "B",
    explanation:
      "The `gcloud run deploy` command creates a new Cloud Run service or updates an existing one with a new container image revision.",
    hint: "This subcommand works for both initial creation and subsequent updates.",
    tags: ["gcp", "cloud-run", "deploy", "container"],
  },
  {
    id: "quiz-gcp-cloud-run-02",
    trackId: "gcp",
    category: "Cloud Run",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "Given the following deploy command, what happens when there are zero incoming requests?",
    codeSnippet: `gcloud run deploy my-api \\
  --image=gcr.io/my-project/api:v2 \\
  --min-instances=0 \\
  --max-instances=10 \\
  --region=us-central1`,
    options: [
      {
        label: "A",
        text: "The service keeps 1 instance running at all times",
      },
      {
        label: "B",
        text: "The service scales to zero instances and you are not billed for compute",
      },
      {
        label: "C",
        text: "The service maintains 10 idle instances",
      },
      {
        label: "D",
        text: "The service is deleted after a timeout period",
      },
    ],
    correctAnswer: "B",
    explanation:
      "With `--min-instances=0`, Cloud Run scales down to zero containers when there is no traffic. You are only billed when instances are processing requests (pay-per-use).",
    hint: "The min-instances flag controls the lower bound of the autoscaler.",
    tags: ["gcp", "cloud-run", "autoscaling", "scale-to-zero"],
  },
  {
    id: "quiz-gcp-cloud-run-03",
    trackId: "gcp",
    category: "Cloud Run",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "You want to send 10% of traffic to a new Cloud Run revision while keeping 90% on the current revision. Which approach is correct?",
    options: [
      {
        label: "A",
        text: "Deploy with `--no-traffic` then use `gcloud run services update-traffic` to split",
      },
      {
        label: "B",
        text: "Deploy two separate Cloud Run services behind a load balancer",
      },
      {
        label: "C",
        text: "Use `--max-instances=1` to limit the new revision",
      },
      {
        label: "D",
        text: "Traffic splitting is not supported on Cloud Run",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Deploying with `--no-traffic` creates a new revision without routing traffic to it. Then `gcloud run services update-traffic --to-revisions` lets you split traffic between revisions for canary deployments.",
    hint: "Cloud Run has built-in traffic management between revisions of the same service.",
    tags: ["gcp", "cloud-run", "traffic-splitting", "canary-deploy"],
  },

  // ─── Pub/Sub ───────────────────────────────────────────────────────
  {
    id: "quiz-gcp-pubsub-01",
    trackId: "gcp",
    category: "Pub/Sub",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "In Pub/Sub, a publisher sends messages to a ____, and subscribers receive messages from a subscription attached to it.",
    options: [
      { label: "A", text: "topic" },
      { label: "B", text: "queue" },
      { label: "C", text: "channel" },
      { label: "D", text: "stream" },
    ],
    correctAnswer: "A",
    explanation:
      "Pub/Sub uses topics as named channels. Publishers send messages to topics, and subscriptions attached to those topics deliver messages to subscribers.",
    hint: "This is the central named resource in the publish-subscribe pattern.",
    tags: ["gcp", "pubsub", "topic", "messaging"],
  },
  {
    id: "quiz-gcp-pubsub-02",
    trackId: "gcp",
    category: "Pub/Sub",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "Given the following commands, how many subscriptions will receive the published message?",
    codeSnippet: `gcloud pubsub topics create my-topic

gcloud pubsub subscriptions create sub-a --topic=my-topic
gcloud pubsub subscriptions create sub-b --topic=my-topic
gcloud pubsub subscriptions create sub-c --topic=my-topic

gcloud pubsub topics publish my-topic --message="Hello"`,
    options: [
      { label: "A", text: "Only 1 (round-robin delivery)" },
      { label: "B", text: "All 3 subscriptions receive the message" },
      { label: "C", text: "Only the first subscription created" },
      { label: "D", text: "None, until a subscriber pulls" },
    ],
    correctAnswer: "B",
    explanation:
      "Pub/Sub delivers a copy of each message to every subscription on the topic. All three subscriptions will independently receive the message, enabling fan-out patterns.",
    hint: "Pub/Sub is a fan-out messaging system, not a competing-consumer queue.",
    tags: ["gcp", "pubsub", "fan-out", "subscriptions"],
  },
  {
    id: "quiz-gcp-pubsub-03",
    trackId: "gcp",
    category: "Pub/Sub",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "What is the difference between a pull subscription and a push subscription in Pub/Sub?",
    options: [
      {
        label: "A",
        text: "Pull delivers to Cloud Functions; push delivers to VMs",
      },
      {
        label: "B",
        text: "Pull requires the subscriber to request messages; push sends messages to a webhook endpoint",
      },
      {
        label: "C",
        text: "Pull is synchronous; push is asynchronous",
      },
      {
        label: "D",
        text: "Pull only works within GCP; push works with external services",
      },
    ],
    correctAnswer: "B",
    explanation:
      "With pull subscriptions, the subscriber explicitly calls the API to fetch messages. With push subscriptions, Pub/Sub sends each message as an HTTP POST to a configured endpoint URL.",
    hint: "One is initiated by the subscriber, the other is initiated by Pub/Sub itself.",
    tags: ["gcp", "pubsub", "pull", "push"],
  },

  // ─── Firestore ─────────────────────────────────────────────────────
  {
    id: "quiz-gcp-firestore-01",
    trackId: "gcp",
    category: "Firestore",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "In Firestore, data is stored in ____, which are organized into collections.",
    options: [
      { label: "A", text: "documents" },
      { label: "B", text: "rows" },
      { label: "C", text: "records" },
      { label: "D", text: "nodes" },
    ],
    correctAnswer: "A",
    explanation:
      "Firestore is a document database. Each document contains a set of key-value pairs and is identified by a unique ID within its collection.",
    hint: "Firestore is a NoSQL document database -- the clue is in the database type.",
    tags: ["gcp", "firestore", "document", "nosql"],
  },
  {
    id: "quiz-gcp-firestore-02",
    trackId: "gcp",
    category: "Firestore",
    difficulty: "intermediate",
    type: "output-prediction",
    question: "What does the following Firestore query return?",
    codeSnippet: `const snapshot = await db
  .collection("users")
  .where("age", ">=", 18)
  .where("age", "<=", 30)
  .orderBy("age")
  .limit(5)
  .get();

console.log(snapshot.size);`,
    options: [
      {
        label: "A",
        text: "The number of all users in the collection",
      },
      {
        label: "B",
        text: "At most 5 -- the count of users aged 18-30, ordered by age, limited to 5",
      },
      {
        label: "C",
        text: "Exactly 5 users regardless of the age filter",
      },
      {
        label: "D",
        text: "An error, because you cannot chain two `where` clauses on the same field",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Firestore supports range filters on a single field. The query fetches users aged 18-30 ordered by age, and `limit(5)` caps the results. `snapshot.size` returns the actual count of matched documents (0 to 5).",
    hint: "Range queries on the same field are supported and the limit caps the result set.",
    tags: ["gcp", "firestore", "query", "range-filter"],
  },
  {
    id: "quiz-gcp-firestore-03",
    trackId: "gcp",
    category: "Firestore",
    difficulty: "advanced",
    type: "multiple-choice",
    question:
      "In Firestore, why does a query with inequality filters on two different fields require a composite index?",
    options: [
      {
        label: "A",
        text: "Firestore does not support inequality filters at all",
      },
      {
        label: "B",
        text: "Firestore can only use one single-field index per query; a composite index merges the fields to serve the query efficiently",
      },
      {
        label: "C",
        text: "Composite indexes are only needed for equality filters",
      },
      {
        label: "D",
        text: "Firestore automatically creates all necessary indexes",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Firestore automatically creates single-field indexes, but queries with inequality filters on multiple fields need a composite index to avoid full collection scans. You must create these explicitly.",
    hint: "Single-field indexes only cover one dimension; the query needs multi-dimensional filtering.",
    tags: ["gcp", "firestore", "composite-index", "query-planning"],
  },

  // ─── VPC ───────────────────────────────────────────────────────────
  {
    id: "quiz-gcp-vpc-01",
    trackId: "gcp",
    category: "VPC",
    difficulty: "beginner",
    type: "fill-in-blank",
    question:
      "To create a firewall rule allowing TCP port 80 ingress traffic, you run: `gcloud compute ____-rules create allow-http --allow=tcp:80 --direction=INGRESS`.",
    options: [
      { label: "A", text: "firewall" },
      { label: "B", text: "network" },
      { label: "C", text: "security" },
      { label: "D", text: "access" },
    ],
    correctAnswer: "A",
    explanation:
      "The `gcloud compute firewall-rules create` command creates VPC firewall rules that control ingress and egress traffic to and from VM instances.",
    hint: "The resource type shares its name with a network security barrier.",
    tags: ["gcp", "vpc", "firewall", "network-security"],
  },
  {
    id: "quiz-gcp-vpc-02",
    trackId: "gcp",
    category: "VPC",
    difficulty: "intermediate",
    type: "output-prediction",
    question:
      "Given the following firewall rule, which instances will it apply to?",
    codeSnippet: `gcloud compute firewall-rules create allow-internal \\
  --network=my-vpc \\
  --allow=tcp:0-65535,udp:0-65535,icmp \\
  --source-ranges=10.0.0.0/8 \\
  --target-tags=internal-server`,
    options: [
      {
        label: "A",
        text: "All instances in `my-vpc`",
      },
      {
        label: "B",
        text: "Only instances with the network tag `internal-server` in `my-vpc`",
      },
      {
        label: "C",
        text: "Only instances in the `10.0.0.0/8` subnet",
      },
      {
        label: "D",
        text: "All instances across all VPC networks in the project",
      },
    ],
    correctAnswer: "B",
    explanation:
      "The `--target-tags` flag restricts the firewall rule to only instances that have the matching network tag. Without target tags, the rule would apply to all instances in the network.",
    hint: "The `--target-tags` flag narrows which instances the rule affects.",
    tags: ["gcp", "vpc", "firewall", "network-tags"],
  },
  {
    id: "quiz-gcp-vpc-03",
    trackId: "gcp",
    category: "VPC",
    difficulty: "advanced",
    type: "fill-in-blank",
    question:
      "To enable private communication between two VPC networks without using the public internet, you configure VPC Network ____.",
    options: [
      { label: "A", text: "Peering" },
      { label: "B", text: "Bridging" },
      { label: "C", text: "Tunneling" },
      { label: "D", text: "Mirroring" },
    ],
    correctAnswer: "A",
    explanation:
      "VPC Network Peering connects two VPC networks so that resources in each can communicate using internal IP addresses. Traffic stays on Google's network and never traverses the public internet.",
    hint: "This feature allows two equal networks to directly exchange traffic.",
    tags: ["gcp", "vpc", "peering", "private-networking"],
  },
  {
    id: "quiz-gcp-vpc-04",
    trackId: "gcp",
    category: "VPC",
    difficulty: "intermediate",
    type: "multiple-choice",
    question:
      "In a GCP VPC, what is the relationship between subnets and regions?",
    options: [
      {
        label: "A",
        text: "Each subnet spans all regions in the VPC",
      },
      {
        label: "B",
        text: "Each subnet belongs to exactly one region but VMs in it can be in any zone within that region",
      },
      {
        label: "C",
        text: "Each subnet belongs to exactly one zone",
      },
      {
        label: "D",
        text: "Subnets are global and not tied to any region",
      },
    ],
    correctAnswer: "B",
    explanation:
      "GCP subnets are regional resources. A subnet is created in one region, and VMs in that subnet can be placed in any zone within that region. The VPC itself is global, but its subnets are regional.",
    hint: "VPCs are global but subnets are scoped to a geographic area that contains multiple zones.",
    tags: ["gcp", "vpc", "subnet", "region"],
  },
];
