import graphene
import repos.schema
import users.schema


class Query(users.schema.Query, repos.schema.Query, graphene.ObjectType):
    pass

class Mutation(users.schema.Mutation, repos.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
