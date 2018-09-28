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

```graphql
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

```graphql
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

```graphql
enum FuelType {
    Petrol
    Diesel
    Hybrid
}
```

### Interfaces
Similar to any programming language, graphql type system also supports interfaces. When a type implements interface, it needs to have all the fields defined in that interface.

As we can see in the below example, Vehicle is an interface which declares Id, Name and Wheels fields. This means that Motorcycle and Car which implement Vehicle, must have these fields. They may or may not have their own additional fields like Make in case of Motorcycle and Fuel in case of Car.

```graphql
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

```graphql
union VehicleType = Motorcycle | Car
```

Now when we write a graphql query to fetch VehicleType information, we can ask some of the common fields and some of the specific fields conditionally. Below is an example of graphql query which is requesting for AllVehicleTypes with common fields like Id, Name and fields specific to either Motorcycle or Car.

```graphql
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

### Fields

A very simple definition of GraphQL would be asking for speific fields on objects. Check below example

Query

```graphql
{
    employee {
        name
    }
}
```

Response 

```json
{
    "data": {
        "employee": {
            "name": "John Doe"
        }
    }
}
```

As we can see data format exactly looks like the query. This way client knows excatly what data it has to consume. In above example "name" fields returns data of type "String". Client can also ask for an object. For example

Query
```graphql
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
```json
{
    "data": {
        "employer": {
            "name": "Abc Company",
            "employees": [{
                "name": "John Doe"
            }, {
                "name": "Jon Doe"
            }]
        }
    }
}
```

### Arguments

Unlike REST services where you can pass parameters via query parameters(GET) or request body(POST) in your request, in GraphQL you can provide every field an argument which makes easy for fetching data. These arguments can be of scalar type, enumeration type etc. 

Query
```graphql
{
    employees(age: 29) {
        name
        age
    }
}
```

Response
```json
{
    "data": {
        "employees": [{
            "name": "John Doe",
            "age": 29
        }, {
            "name": "Jon Doe",
            "age": 29
        }]
    }
}
```

### Fragments

To resuse your fields in query you can create Fragments in GraphQL. For example

Query
```graphql
{
    employer(id: 10) {
        ...employeeInfo
    }
}
fragment employeeInfo on Employer {
    name
    employees {
        name
    }
}
```

Response
```json
{
    "employer": {
        "name": "Abc Company",
        "employees": [{
            "name": "John Doe"
        }, {
            "name": "Jon Doe"
        }]
    }
}
```

Fragement are generally used to split complex queries into chunks and reuse of query fields.

### Variables

Variables are used to pass dynamic values to queries. It's not good practice to interpolate dynamic values from user action on client side to construct queries. Instead of that GraphQL provides a way to define a variable and pass value for that variable at runtime using dictionary.

Query
```graphql
{
    employees(age: $employeeAge) {
        name
        age
    }
}
```

```json
{
    "employeeAge": 29
}
```

Response
```json
{
    "data": {
        "employees": [{
            "name": "John Doe",
            "age": 29
        }, {
            "name": "Jon Doe",
            "age": 29
        }]
    }
}
```

### Directives

Directives are used to change structure of queries at runtime using variables. Directive can be attached to field or fragment inclusion. There are two directives which must be supported by any graphql-server implementation

* @skip (if: Boolean) - It skips the field if argument is true
* @Include (if: Boolean) - It inclues the field if argument is true

Query
```graphql
{
    employees(age: $employeeAge) {
        name
        age
        personalInfo @Include(if: $showPersonalInfo) {
            address
            contact
        }
    }
}
```

```json
{
    "employeeAge": 29,
    "showPersonalInfo": true
}
```

Response
```json
{
    "data": {
        "employees": [{
            "name": "John Doe",
            "age": 29,
            "personalInfo": {
                "address": "remote",
                "contact": "123456789"
            }
        }]
    }
}
```

### Mutations

Mutations are used to modify server side data. 

Query
```graphql
mutation CreateEmployeeForEmployer($employer: Employer!, $employee: Employee!) {
    createEmployee(employer: $employer, employee: $employee) {
        name
        age
    }
}
```

```json
{
    "employer": "Abc Company",
    "employee": {
        "name": "John Doe",
        "age": 29
    }
}
```

Response
```json
{
    "data": {
        "createEmployee": {
            "name": "John Doe",
            "age": 29
        }
    }
}
```

### Query Validation

Because of use of types in GraphQL query we can know whether query is valid or not before executing it. It can be achieved using validator provided by GraphQL implementation. To use validator you need to write test cases and use validator to validate schema

## GraphQL Implementations

GraphQL is supported in Python, JavaScript, Java, Ruby, C#, Go, PHP, Erlang, Scala, Go, Groovy, Elixir.

## GraphQL-python (Graphene) Example

### Getting Started

To start with GraphQL server implementation in python we will create virtual environment for project to keep all the dependencies isolated from other projects and system. To leave it execute "deactivate" command in shell. Always remember to activate virtual environment.  

```bash
mkdir python-graphql-example
cd python-graphql-example
python3 -m venv venv
source venv/bin/activate
```

Now the project has been changed to (venv) so it means we are in virtual environment. Execute below commands

```bash
pip install django==2.0.2 graphene==2.0.1 graphene-django==2.0.0 django-filter==1.1.0 django-graphql-jwt==0.1.5
django-admin startproject cloudmeshrepo
cd cloudmeshrepo
python manage.py migrate
python manage.py runserver
```

Last command will start server on localhost and you can access it at http://localhost:8000 URL. It will show you welcome page for django. Now open settings.py file under cloudmeshrepo/cloudmeshrepo folder and append following to INSTALLED_APPS

```python
INSTALLED_APPS = (
    # After the default packages
    'graphene_django',
)
```

And at the end of settings.py add following line

```python
GRAPHENE = {
    'SCHEMA': 'cloudmeshrepo.schema.schema',
}
```

### GraphQL server implementation

Now django seperates project into apps. Here we will have one app for Users and one for Repos. Django provides support for SQLite so we will use that for demo.

Go to root dir of project and execute below command

```bash
python manage.py startapp repos
```

Open repos/models.py and add following line

```python
class Repo(models.Model):
    url = models.URLField()
    name = models.TextField(blank=False)
    full_name = models.TextField(blank=False)
    description = models.TextField(blank=True)
```

Now open cloudmeshrepo/settings.py and append below line into INSTALLED_APPS

```python
INSTALLED_APPS = (
    # After the graphene_django app
    'repos',
)
```

Go to root folder and execute below commands. It will create table for new modeld

```bash
python manage.py makemigrations
python manage.py migrate

python manage.py shell
```

Last command will open python shell. Execute below command inside that shell to create some data. Below example data we got from github's API https://api.github.com/users/cloudmesh-community/repos.

```python
from repos.models import Repo
Repo.objects.create(name="boat",full_name="cloudmesh-community/boat",url="https://github.com/cloudmesh-community/boat",description="S.T.A.R. boat")
Repo.objects.create(name="book",full_name="cloudmesh-community/book",url="https://github.com/cloudmesh-community/book",description="Gregor von Laszewski")
Repo.objects.create(name="cm",full_name="cloudmesh-community/cm",url="https://github.com/cloudmesh-community/cm",description="Cloudmesh v4")
Repo.objects.create(name="cm-burn",full_name="cloudmesh-community/cm-burn",url="https://github.com/cloudmesh-community/cm-burn",description="Burns many SD cards so we can build a Raspberry PI cluster")
exit()
```

Now create repos/schema.py with below code. This will introduce custom type of Repo and query with resolver for repos.

```python
import graphene
from graphene_django import DjangoObjectType

from .models import Repo


class RepoType(DjangoObjectType):
    class Meta:
        model = Repo


class Query(graphene.ObjectType):
    repos = graphene.List(RepoType)

    def resolve_repos(self, info, **kwargs):
        return Repo.objects.all()
```

Create cloudmeshrepo/schema.py with below code. It just inherits query defind in repos app. This way we are able to isolate schema to their apps.

```python
import graphene
  
import repos.schema


class Query(repos.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
```
### Querying implemented GraphQL server

Schema is created now to query it we will use GraphiQL which is playground for graphql queries. Open cloudmeshrepo/urls.py and append following code

```python
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
```

Start your server using below command

```bash
python manage.py runserver
```

Now open http://localhost:8000/graphql URL in your broweser. You will see GraphiQL. In the left pane add below query

```graphql
{
  repos {
    name
    fullName
    url
    description
  }
}
```

In the right pane you will see below output

```json
{
  "data": {
    "repos": [
      {
        "name": "boat",
        "fullName": "cloudmesh-community/boat",
        "url": "https://github.com/cloudmesh-community/boat",
        "description": "S.T.A.R. boat"
      },
      {
        "name": "book",
        "fullName": "cloudmesh-community/book",
        "url": "https://github.com/cloudmesh-community/book",
        "description": "Gregor von Laszewski"
      },
      {
        "name": "cm",
        "fullName": "cloudmesh-community/cm",
        "url": "https://github.com/cloudmesh-community/cm",
        "description": "Cloudmesh v4"
      },
      {
        "name": "cm-burn",
        "fullName": "cloudmesh-community/cm-burn",
        "url": "https://github.com/cloudmesh-community/cm-burn",
        "description": "Burns many SD cards so we can build a Raspberry PI cluster"
      }
    ]
  }
}
```

Examples avaialble at : https://github.com/cloudmesh-community/fa18-516-21/tree/master/graphql-examples

## Pros and Cons of Using GraphQL
### Pros
* Unlike REST APIs, only the required data is fetched, nothing more nothing less, which minimizes the data transferred over network
* Seperation of concern is achieved between client and server. Client requests data entities with fields needed for the UI in one query request while server knows about the data structure and how to resolve the data from its sources which could be database, web service, microservice, external APIs, etc.
* Versioning is simpler than REST, since we only have to take care of it when we want to remove any of the fields. Even then we can first mark the field to be removed as deprecated. And later on, this field can be removed when not many clients are using it.
```graphql
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

## References 

* Official GraphQL documentation https://graphql.org/learn/
* GraphQL python example https://www.howtographql.com/graphql-python/0-introduction/
* GraphQL mutation example https://www.howtographql.com/graphql-python/3-mutations/
* GraphQL JWT authentication example https://www.howtographql.com/graphql-python/4-authentication/
