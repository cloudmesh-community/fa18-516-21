from mongoengine import Document
from mongoengine.fields import StringField

class AWS(Document):
    meta = {'collection': 'aws'}
    host = StringField()
    region = StringField()
    image = StringField()

class Azure(Document):
    meta = {'collection': 'azure'}
    host = StringField()
    region = StringField()
    image = StringField()
