from django.contrib.auth import get_user_model

import graphene
from graphene_django import DjangoObjectType

from repos import Document, EmbeddedDocument
from repos import fields
from .models import User, CreateUser

class UserType(DjangoObjectType):
    class Meta:
        model = User

class Query(graphene.ObjectType):
    users = graphene.List(UserType)

    def resolve_users(self, info):
        return User.objects.all()

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()