# GraphQL

## Introduction
GraphQL is data query language developed by Facebook. 

GraphQL allows client to request data they need without thinking about API implementation. It makes apps fast and stable because the app has control over data it needs. This will also reduce network I/O since only necessary data is getting transfered from server to client.

Unlike REST APIs which required loading data from multiple URLs, GraphQL can get all data the app needs in single request. GraphQL APIs are defined in terms of types and fields. Types will help GraphQL to ensure that client only asks for what's possible otherwise it provides clear and helpful errors. 

Initially GraphQL was implemented in JavaScript. Today there are lots of implementations available of GraphQL in different languages. We will explore graphql-python implementation


## GraphQL type system and schema

### Type System
In GraphQL world, query is what we request to graphql server and the result will be obtained in exact same structure. It means we will know ahead of time what we're going to get as result, nothing less and nothing more.

Here's how a simple graphQL query would look like

```
{
    person {
        name 
        age
        friends {
            name
        }
    }
}
```

And this would fetch the below result

```json
{
    "person": {
        "name": "John Doe",
        "age": 25,
        "friends": [
            {
                "name": "Mary Jane"
            },
            {
                "name": "David Miller"
            }
        ]
    }
}
```

But for this we need to define the types that are going to be honored by graphql service so that when the query comes in, it is validated to match the schema of these types.

Types are defined as part of each graphql service, in graphql schema language which are programming language agnostic. Below is an example of a graphql type.

```
type Person {
    name: String!
    age: Int
    friends: [Person!]!
}
```

Note that '!' here means that the field value cannot be null. [Person!]! means that the array cannot be null and also none of the items in the array can be null.

### Scalar Types
Graphql supports the below scalar types:
* String: UTF8 characters
* Int: 32 bit signed integer
* Float: Double precision floating point value
* Boolean: true or false
* ID: Represents a unique identifier which can be used as a key to fetch the object

### Enumeration Types
Enums also are scalar types which define certain set of restricted values. When a graphql schema defines a field of enum type, we expect that field's value to be one of the enum values only.

```
enum FuelType {
    Petrol
    Diesel
    Hybrid
}
```

### Interfaces
Similar to any programming language, graphql type system also supports interfaces. When a type implements interface, it needs to have all the fields defined in that interface.

As we can see in the below example, Vehicle is an interface which declares Id, Name and Wheels fields. This means that Motorcycle and Car which implement Vehicle, must have these fields. They may or may not have their own additional fields like Make in case of Motorcycle and Fuel in case of Car.

```
interface Vehicle {
    Id: ID!
    Name: String!
    Wheels: Int!
}

type Motorcycle implements Vehicle {
    Id: ID!
    Name: String!
    Wheels: Int!
    Make: String!
}

type Car implements Vehicle {
    Id: ID!
    Name: String!
    Wheels: Int!
    Fuel: FuelType
}
```

### Union Types
As the name suggests, union types are union of two or more types. Here's how we can define a union type.

```
union VehicleType = Motorcycle | Car
```

Now when we write a graphql query to fetch VehicleType information, we can ask some of the common fields and some of the specific fields conditionally. Below is an example of graphql query which is requesting for AllVehicleTypes with common fields like Id, Name and fields specific to either Motorcycle or Car.

```
{
    AllVehicleTypes {
        Id
        Name
        ... on Motorcyle {
            Make
        }
        ... on Car {
            Fuel
        }
    }
}
```

### Input Types



## GraphQL Query

App asks for data from server in form of GraphQL query. A GraphQL query can have different fields, arguments etc which is described below.

### Query Syntax

#### Fields

A very simple definition of GraphQL would be asking for speific fields on objects. Check below example

For query

```
{
    employee {
        name
    }
}
```

Response 

``` json
{
    "data": {
        "employee": {
            "name": "John Doe"
        }
    }
}
```

As we can see data format exactly looks like the query. This way client knows excatly what data it has to consume. In above example "name" fields returns data of type "String". Client can also ask for an object. For example

For Query

```
{
    employer {
        name
        employees {
            name
        }
    }
}
```

Response

``` json
{
    "data": {
        "employer": {
            "name": "John Doe",
            "employees": [{
                "name": "John Doe"
            }, {
                "name": "Jon Doe"
            }]
        }
    }
}
```

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
### Pros
* Unlike REST APIs, only the required data is fetched, nothing more nothing less, which minimizes the data transferred over network
* Seperation of concern is achieved between client and server. Client requests data entities with fields needed for the UI in one query request while server knows about the data structure and how to resolve the data from its sources which could be database, web service, microservice, external APIs, etc.
* Versioning is simpler than REST, since we only have to take care of it when we want to remove any of the fields. Even then we can first mark the field to be removed as deprecated. And later on, this field can be removed when not many clients are using it.
```
type Car {
    id: ID!
    make: String
    description: String @deprecated(reason: "Field is deprecated!")
}
``` 
* Graphql is gaining momentum as its community, support and enthusiasm is growing. Many graphql editors, IDEs and packages are getting added day by day. 
### Cons
* Graphql query can get very complex. Client may not necessarily know how expensive the queries can be for server to go and gather the data. This can be overcome by limiting the query depth, recursion, etc.
* Caching gets pretty tricky and messy in case of graphql. In REST, you can have seperate API url for each resource requested, caching can be done at this resource level. However in graphql you can have different queries but they can operate over a single API url. This means that caching needs to be done at the field level rather, and hence it is difficult.


## Conclusion
In general there are many reasons to have graphql in our software ecosystem. Beauty of it lies in the flexibility and extensiveness it provides and also fits well with the microservices architecture which many are moving towards. Already big players like Github, Pinterest, Intuit, Coursera, Shopify, etc. are using it.
With that being said, REST APIs still have it's own place and may prove better choice in certain use cases. Both REST and graphql have some tradeoffs which need to be understood before being considered.