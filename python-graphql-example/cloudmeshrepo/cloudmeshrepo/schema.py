import graphene

import repos.schema


class Query(repos.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
