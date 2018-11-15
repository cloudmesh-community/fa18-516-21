import graphene
import graphql_jwt
from graphene_django import DjangoObjectType

from .models import Repo, CreateRepo


class RepoType(DjangoObjectType):
    class Meta:
        model = Repo


class Query(graphene.ObjectType):
    repos = graphene.List(RepoType)

    def resolve_repos(self, info, **kwargs):
        return Repo.objects.all()

class Mutation(graphene.ObjectType):
    create_repo = CreateRepo.Field()