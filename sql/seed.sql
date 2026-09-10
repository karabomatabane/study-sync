BEGIN;

INSERT INTO questions (
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer
)
VALUES
    (
        'A developer needs to store application configuration values and rotate a database password without changing application code. Which AWS service is best suited for this requirement?',
        'Amazon S3',
        'AWS Secrets Manager',
        'Amazon CloudWatch Logs',
        'AWS CloudFormation',
        'B'
    ),
    (
        'A Lambda function must access objects in an S3 bucket. Which approach follows the principle of least privilege?',
        'Attach a policy granting s3:* on all resources to the Lambda execution role',
        'Store an IAM access key in the function environment variables',
        'Attach a role policy granting only the required S3 actions on the specific bucket or objects',
        'Make the S3 bucket public',
        'C'
    ),
    (
        'An application processes messages from an Amazon SQS queue using Lambda. What happens when a message is not successfully processed?',
        'The message is immediately deleted from the queue',
        'The message becomes visible again after the visibility timeout',
        'The queue is automatically deleted',
        'The message is moved to Amazon S3',
        'B'
    ),
    (
        'A DynamoDB application must support rapid lookups by userId and timestamp, even though userId is not the table primary key. Which feature should be used?',
        'A global secondary index',
        'DynamoDB Streams',
        'A DynamoDB transaction',
        'DynamoDB point-in-time recovery',
        'A'
    ),
    (
        'A team wants to deploy the same infrastructure consistently across development, testing, and production. Which AWS service provides infrastructure as code?',
        'Amazon Inspector',
        'AWS CloudFormation',
        'AWS CloudTrail',
        'Amazon EventBridge',
        'B'
    ),
    (
        'A REST API receives requests from a web browser hosted on a different domain. Which capability must the API support for the browser to allow the requests?',
        'Cross-origin resource sharing (CORS)',
        'Server-side encryption',
        'Elastic Load Balancing',
        'VPC peering',
        'A'
    ),
    (
        'A developer wants to run unit tests automatically whenever code is pushed to a source repository. Which AWS service is designed to provide this build and test automation?',
        'AWS CodeBuild',
        'Amazon Route 53',
        'AWS Config',
        'Amazon Macie',
        'A'
    ),
    (
        'An application running on Amazon EC2 needs temporary permissions to read from an S3 bucket. What is the recommended way to provide these permissions?',
        'Hard-code an IAM user access key in the application',
        'Use the EC2 instance metadata service with an IAM role attached to the instance',
        'Make the S3 bucket publicly readable',
        'Save the root user credentials on the instance',
        'B'
    ),
    (
        'A company needs a fully managed relational database that supports automatic backups and point-in-time recovery. Which service should it use?',
        'Amazon RDS',
        'Amazon ElastiCache',
        'Amazon Neptune',
        'Amazon OpenSearch Service',
        'A'
    ),
    (
        'A Lambda function sometimes runs longer than expected because it waits for an external API. Which Lambda setting determines the maximum execution time?',
        'Memory size',
        'Reserved concurrency',
        'Timeout',
        'Ephemeral storage',
        'C'
    ),
    (
        'A developer needs to trace requests as they move through an API Gateway endpoint and several Lambda functions. Which AWS service should be enabled?',
        'AWS X-Ray',
        'AWS Artifact',
        'Amazon GuardDuty',
        'AWS Trusted Advisor',
        'A'
    ),
    (
        'An S3 bucket contains sensitive data. Which configuration prevents objects from being accidentally exposed through public bucket or object policies?',
        'S3 Transfer Acceleration',
        'S3 Object Lock',
        'S3 Block Public Access',
        'S3 Inventory',
        'C'
    ),
    (
        'A service must publish events so that multiple independent consumers can process each event. Which AWS service is most appropriate for event routing and fan-out?',
        'Amazon EventBridge',
        'Amazon EBS',
        'AWS Snowball',
        'Amazon CloudFront',
        'A'
    ),
    (
        'A deployment must gradually shift traffic from an existing version of a Lambda function to a new version and allow rollback. Which feature should be used?',
        'Lambda aliases with weighted traffic shifting',
        'DynamoDB Streams',
        'S3 lifecycle rules',
        'EC2 user data',
        'A'
    ),
    (
        'A developer wants to be notified when an application error causes a CloudWatch alarm to enter the ALARM state. Which service can deliver the notification by email?',
        'Amazon SNS',
        'Amazon SQS',
        'AWS Direct Connect',
        'AWS DataSync',
        'A'
    );

COMMIT;
