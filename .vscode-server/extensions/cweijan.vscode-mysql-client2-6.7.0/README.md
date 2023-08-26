Note: The extension requires payment to unlock all features, online document: [doc.database-client.com](https://doc.database-client.com).

# Database Client

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2">
    <img src="https://img.shields.io/vscode-marketplace/v/cweijan.vscode-mysql-client2.svg?label=vscode%20marketplace">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2">
    <img src="https://img.shields.io/visual-studio-marketplace/i/cweijan.vscode-mysql-client2">
  </a>
  <a href="https://github.com/cweijan/vscode-database-client">
    <img src="https://img.shields.io/github/stars/cweijan/vscode-database-client?logo=github&style=flat">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2">
    <img src="https://img.shields.io/vscode-marketplace/r/cweijan.vscode-mysql-client2.svg">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2">
  <img alt="GitHub" src="https://img.shields.io/github/license/cweijan/vscode-database-client">
  </a>
</p>
<br>

This project is a database client for VSCode, supports manager **MySQL/MariaDB, PostgreSQL, SQLite, Redis, ClickHouse, Kafka, MongoDB, Snowflake**, and **ElasticSearch**, and works as an **SSH** client, boost your maximum productivity!

> Project site: [vscode-database-client](https://github.com/cweijan/vscode-database-client), [中文文档](https://github.com/cweijan/vscode-database-client/blob/HEAD/README_CN.md)

[![Logo](https://database-client.com/text_logo.png)](https://database-client.com)

## Features

- [Database Client](#database-client)
  - [Connect](#connect)
  - [Table](#table)
  - [Execute SQL Query](#execute-sql-query)
  - [Backup/Import](#backupimport)
  - [Setting](#setting)
  - [Filter](#filter)
  - [Generate Mock Data](#generate-mock-data)
  - [History](#history)

## Telemetry reporting

The Database Client extension will collects and sends anonymous usage data to the Database Client server to help improve our products and services. Read our [Privacy Statement](https://database-client.com/#/privacyPolicy) to learn more.

If you don't want to be collected by Database Client, you can turn it off by setting `"database-client.telemetry.usesOnlineServices": false`.

## Installation

Install from vscode marketplace [vscode-database-client](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2).

## Connect

1. Open Database Explorer panel, then click the `+` button.
2. Select your database type, input connection config then click the connect button.

![connection](https://doc.database-client.com/images/connection.jpg)

Two panels are created because in some cases you need to view both SQL and NoSQL data at the same time, you can drag the panel to the other by long-pressing.

## Table

1. Click table to open table view.
2. Click button beside table to open new table view.
3. Then you can do data modification on the table view.

![query](https://doc.database-client.com/images/view.png)

## Execute SQL Query

In the Database Explorer panel, click the `Open Query` button.

![newquery](https://doc.database-client.com/images/newquery.jpg)

That will open a SQL editor bind of database, it provider:

1. IntelliSense SQL edit.
2. snippets:`sel、del、ins、upd、joi`...
3. Run selected or current cursor SQL (Shortcut : Ctrl+Enter).
4. Run all SQL (Shortcut : Ctrl+Shift+Enter).

Note: The extension is developed using Nodejs. Nodejs does not allow duplicate name attributes, so you need to avoid columns with the same name in your query, otherwise the results will not be displayed in full.

![run](https://doc.database-client.com/images/run.jpg)

This extension supports codelen, but does not support stored procedures and functions. If you use them frequently, it is recommended to disable codelen
![image](https://user-images.githubusercontent.com/27798227/144196926-e581872e-5392-4744-a646-a644749c548c.png)

## Cache

In order to improve performance, the database information is cached. If your database structure changes externally, you need to click the refresh button to refresh the cache。

![](https://doc.database-client.com/image/connection/1638342622208.png)

## Backup/Import

Move to ant DatabaseNode or TableNode. The export/import options are listed in the context menu (right click to open).

The extension implements the backup function, but it is not stable enough. You can add mysql_dump or pg_dump to the environment variable, and the extension will use these tools for backup.

![bakcup](https://doc.database-client.com/images/Backup.jpg)

## Setting

This extension contain some setting, can be modified as follows, some settings only take effect for paid users.

The default settings can get the best experience, don't worry

![image](https://user-images.githubusercontent.com/27798227/146523121-9de9c708-8a8e-4e3b-ae1d-9da36f3217e1.png)
![](https://github.com/cweijan/vscode-database-client/raw/HEAD/images/1611910592756.png)

## Generate Mock Data

You can easily generate test data.

![mockData](https://doc.database-client.com/image/minor/mockData.jpg)

## History

Click the history button to open the list of recently executed query history records.

![history](https://github.com/cweijan/vscode-database-client/raw/HEAD/images/history.jpg)

## Credits

- [sql-formatter](https://github.com/zeroturnaround/sql-formatter) Sql format lib.
- [umy-ui](https://github.com/u-leo/umy-ui): Result view render.
- [ssh2](https://github.com/mscdex/ssh2): SSH client.
- Client Lib:
  - [node-mysql2](https://github.com/sidorares/node-mysql2) : MySQL client.
  - [node-postgres](https://github.com/brianc/node-postgres): PostgreSQL client.
  - [tedious](https://github.com/tediousjs/tedious): SqlServer client.
  - [ioredis](https://github.com/luin/ioredis): Redis client.
  - [vscode-sqlite](https://github.com/AlexCovizzi/vscode-sqlite): SQLite client code reference.
