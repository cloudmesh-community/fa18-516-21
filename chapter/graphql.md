# GraphQL

## Introduction
GraphQL is data query language developed by Facebook.

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

### Query Syntax

#### Fields

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
