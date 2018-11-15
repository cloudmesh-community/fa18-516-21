import graphene
from repos import Document, EmbeddedDocument
from repos import fields

class User(Document):
    user_id = fields.UUIDField(verbose_name="UserId")
    username = fields.StringField(verbose_name="Username", max_length=255)
    email = fields.EmailField(verbose_name="Email")
    password = fields.StringField(verbose_name="Password", max_length=12)
    first_name = fields.StringField(verbose_name="FirstName", max_length=50)
    last_name = fields.StringField(verbose_name="LastName", max_length=50)

class CreateUser(graphene.Mutation):
    user_id = graphene.UUID()
    username = graphene.String()
    email = graphene.String()
    password = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()

    class Arguments:
        user_id = graphene.UUID()
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()

    def mutate(self, info, user_id, username, email, password, first_name, last_name):
        user = User(user_id=user_id, username=username, email=email, password=password, first_name=first_name, last_name=last_name)
        user.save()

        return CreateUser(user_id=user.user_id, username=user.username, email=user.email, password=user.password, first_name=user.first_name, last_name=user.last_name)