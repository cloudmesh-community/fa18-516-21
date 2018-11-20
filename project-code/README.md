# Cloudmesh App #

This is project for Cloudmesh GUI using electronjs and backend using graphql-django-python.

## Quick start

This app consists for two sub modules

* app - A cross-platform ElectronJS app which will be distributed to users
* server - The GraphQL server for app to get data. This server will run on cloud.

## Development

Below steps needs to be performed to setup development environment

### Setup Server

To setup server execute following commands after cloning repository

```bash
cd project-code
python3 -m venv cloudmesh-graphql-server
cd cloudmesh-graphql-server
source bin/activate
pip install -r requirements.txt
python app.py
```

To seed more data, add it in database.py, call `init_db()` from main and then run app again

### Setup App

To set up UI project execute following commands after cloning repository

```bash
cd project-code/app
npm install
npm run build
```

For development purpose app assumes that server is running on following URL

* http://localhost:5000/graphql/

start app using

```bash
npm start
```

It will open up an application where you will see title and data it got from python server.

<kbd>![](../project-paper/images/vm-list.png)</kbd>
