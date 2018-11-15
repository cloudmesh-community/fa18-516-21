import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from models import AWS as AwsModel
from models import Azure as AzureModel

class AWS(MongoengineObjectType):
    class Meta:
        model = AwsModel
        interfaces = (Node,)

class Azure(MongoengineObjectType):
    class Meta:
        model = AzureModel
        interfaces = (Node,)

class Query(graphene.ObjectType):
    node = Node.Field()
    allAwss = MongoengineConnectionField(AWS)
    allAzures = MongoengineConnectionField(Azure)

schema = graphene.Schema(query=Query, types=[AWS, Azure])