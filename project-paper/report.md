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

[GraphQL]{.index} is a data query language developed by Facebook. GraphQL 
allows clients to request they need while specifing attributes in the query 
without thinking much about the API implementation. It simplifies access and 
reduces traffic as the application has control over the data it needs and its 
format. Hence GraphQL reduces the network traffic as only the necessary data 
is transfered from server to client.


## Requirements



## Design 

Cloudmesh App is divided in two parts

* Client App

Client app can be distributed to users. This app will provide a simple 
interface to user using which user can execute all commands provided by cm4.
Client app will communicate with GraphQL server and based on input from user
server will execute commands.

* GraphQL server

This GraphQL server will be running on one cloud 
instance to which all client apps can connect.

## Architecture

For client app ElectronJS[@electronjs] is used. Using ElectronJS we can build 
cross platform desktop apps with JavaScript, HTML and CSS. ElectronJS combines
power of native apps with beautiful web interface.

To implement web interface BackboneJS[@backbonejs] is used. BackboneJS provides
an MVC structure with models,collections and views. For code reusability views
have been divided in to two folders

* Smart Views: Knows how to communicate with server but doesn't know about 
representation 

* Dumb View: Doesn't know how to communicate with server but knows how to render
data

All the utitlity functions are available under utils directory. 

For HTML templates HandlebarsJS[@handlebarsjs] is used. Handlebars provides set 
of functions which lets us build generic HTML templates easily. It also provides
a way to extend helper function and create custom helpers to use in templates.

## Dataset

Used faker to generate fake data for testing.

## Implementation

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
| Added code to show VM details                      | Mihir  |