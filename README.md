# Elastic Beanstalk Follow Along

## One video is missing

In the Follow Along, the video explaining the Dockerfile creation is missing!!!

Be sure to check [EB-Follow-Along-Docker](https://github.com/ExamProCo/TheFreeAWSDeveloperAssociate/tree/master/EB-Follow-Along-Docker) directory to catch up and finish the section.

## Create Database

`createdb study-sync -h localhost -U postgres`

## Create Schemae

`psql study-sync < sql/schema.sql -h localhost -U postgres`

## Import Data

`psql study-sync < sql/seed.sql -h localhost -U postgres`

## Verify Data

```sh
psql postgres://postgres:password@localhost:5432/study-sync
```

```sql
SELECT * FROM questions;
```