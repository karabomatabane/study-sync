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
---
## Install EB CLI
```sh
git clone https://github.com/aws/aws-elastic-beanstalk-cli-setup.git
python ./aws-elastic-beanstalk-cli-setup/scripts/ebcli_installer.py
echo 'export PATH="$HOME/.ebcli-virtual-env/executables:$PATH"' >> ~/.bash_profile && source ~/.bash_profile
```

## Initialise EB

```sh
eb init
```

## Set Up Code Source
```sh
eb codesource
```

## Make Config Var for EB Extensions

```sh
mkdir .ebextensions
touch .ebextensions/001_envar.config
```

## Create EB environment
```sh
eb create --single
```