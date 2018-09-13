# GraphQL

## Introduction
GraphQL is data query language developed by Facebook. 

GraphQL allows client to request data they need without thinking about API implementation. It makes apps fast and stable because the app has control over data it needs. This will also reduce network I/O since only necessary data is getting transfered from server to client.

Unlike REST APIs which required loading data from multiple URLs, GraphQL can get all data the app needs in single request. GraphQL APIs are defined in terms of types and fields. Types will help GraphQL to ensure that client only asks for what's possible otherwise it provides clear and helpful errors. 

Initially GraphQL was implemented in JavaScript. Today there are lots of implementations available of GraphQL in different languages. We will explore graphql-python implementation


## GraphQL type system and schema

### Type System

### Scalar Types

### Interfaces

### Union Types

### Input Types

### Enumeration Types

## GraphQL Query

App asks for data from server in form of GraphQL query. A GraphQL query can have different fields, arguments etc which is described below.

### Query Syntax

#### Fields

A very simple definition of GraphQL would be asking for speific fields on objects. Check below example

| Query         | Data          |
| ------------- |:-------------:|
| {employee {name}} | {"data": {"employee": {"name": "John Doe"}}} |

As we can see data format exactly looks like the query. This way client knows excatly what data it has to consume. In above example "name" fields returns data of type "String". Client can also ask for an object. For example

| Query         | Data          |
| ------------- |:-------------:|
| {employer {name employees {name}}} | {"data": {"employer": {"name": "ABC ORG", employees: [{"name": "John Doe"}]}}} |

#### Arguments

#### Fragements

#### Variables

#### Directives

#### Mutations

### Query Validation

### Query Executiom

## GraphQL Implementations

## GraphQL-python (Graphene) Example

### Getting Started

### GraphQL server implementation

### Querying implemented GraphQL server

## Pros and Cons of Using GraphQL

## Conclusion
