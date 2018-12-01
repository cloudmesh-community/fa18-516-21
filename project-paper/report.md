# Cloudmesh GraphQL App :hand: fa18-516-21 and fa18-516-02

| Mihir Shanishchara, Vineet Barshikar
| mshanish@iu.edu, vbarshik@indiana.edu
| Indiana University
| hid: fa18-516-21 fa18-516-02
| github: [:cloud:](https://github.com/cloudmesh-community/fa18-516-21/blob/master/project-paper/report.md)
| code: [:cloud:](https://github.com/cloudmesh-community/fa18-516-21/tree/master/project-code)

---

Keywords: GraphQL, Cloudmesh client, mongoengine, Flask, Electron

---

## Abstract



## Introduction

Cloudmesh cm4 is an ongoing project worked upon by entire class to create a 
network of computers that run parallel jobs. Currently it accepts commands via 
command line. 

Our project provides an user interface to Cloudmesh cm4. In our project, we 
have implemented a client-server application which will accept commands from 
user interface and pass it to server which will perform corresponding 
appropriate actions. Our second aim with this project is to demonstrate client 
server communication through GraphQL Apis.

More info for GraphQL is available as a chapter in cloud computing handbook.

## Requirements

* A cross platform desktop application which can be reditributed to users
* Client App should show data from MongoDB using GraphQL APIs
* Client App should send user action to server and mutate date
* Client and server should be able to handle more than 10000 VMs 

## Design 

Cloudmesh App is divided in two parts

* *Client App*: Client app can be distributed to users. This app will provide a simple 
interface to user using which user can execute all commands provided by cm4.
Client app will communicate with GraphQL server and based on input from user
server will execute commands.

* *GraphQL server*: This GraphQL server will be running on one cloud 
instance to which all client apps can connect.

## Architecture

Client App is designed using following technologies

* ElectronJS [@electronjs] : Using ElectronJS we can build cross platform 
  desktop apps with JavaScript, HTML and CSS. ElectronJS combines
  power of native apps with beautiful web interface.

* BackboneJS [@backbonejs] : BackboneJS provides an MVC structure with 
  models,collections and views. For code reusability views have been 
  divided in to two categories
  
  * Smart View: Knows how to communicate with server but doesn't know about 
    representation 
  * Dumb View: Doesn't know how to communicate with server but knows how to 
    render data

* HandlebarsJS [@handlebarsjs]: Handlebars provides set of functions which 
  lets us build generic HTML templates easily. It also provides a way to 
  extend helper function and create custom helpers to use in templates.
  * All custom helper functions for tempaltes are defined at utils/helpers 
    space

* jQuery [@jquery]: jQuery provides set of functions which are very useful
  for DOM manipulation

* Material UI [@materialui]: Material UI is open source design spec which is 
  mainly developed by Google. We are using web component implementation of
  Material UI.

* Webpack [@webpack]: Webpack is a module bundler and also it provides a way
  to specify loaders for different file types. For example handlebars loader
  is used to load and compile handlebar template before creating bundle.

## Dataset

Used faker to generate fake data for testing.

## Implementation

* Checkout project-code and execute following commands

```bash
cd app
npm install
```

After all UI dependencies are installed execute following commands

```bash
cd ..
python3 -m venv cloudmesh-graphql-server
cd cloudmesh-graphql-server
source bin/activate
pip install -r requirements.txt
```

Now to start graphql server execute following command

```bash
python app.py
```

Once the server is started open another terminal and go to app directory. 
To start client app execute

```bash
npm start
```

## Benchmark

## Conclusion

## Acknowledgement

## Workbreakdown

| Task                                               | Author |
|----------------------------------------------------|--------|
| Intial code setup with client server integration   | Mihir  |
| Integration of mongoengine                         | Vineet |
| Implementation of login page                       | Mihir  |
| Add routing between pages                          | Mihir  |
| Use Flask in server code                           | Vineet |
| GraphQL query to fetch VMs list                    | Vineet |
| Use Faker to generate mock VMs                     | Mihir  |
| GraphQL mutation to change VM state                | Vineet |
| Add Tabs for various VM types (AWS, Azure, etc.)   | Mihir  |
| Add variables for GraphQL APIs                     | Mihir  |
| Make mutations generic                             | Vineet |
| Make custom helper classes for Handlebar templates | Mihir  |
| Lazy loading (infinite scrolling on UI) of VMs     | Vineet |
| Mutation for set/unset Favorite VM                 | Vineet |
| Add code to show VM details                        | Mihir  |
| Add code to mimic DB update from cloudmesh data    | Mihir  |
| Add code to show notifications                     | Mihir  |
| Add helper to prettify JSON                        | Mihir  |
| Implement sort by dropdown and integrate with API  | Mihir  |
| Added table view to the list of VMs                | Vineet |
| Added sorting by IsFavorite and host               | Vineet |