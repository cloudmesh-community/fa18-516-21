from mongoengine import Document
from mongoengine.fields import StringField,ListField,DictField

class AWS(Document):
    meta = {'collection': 'aws'}
    host = StringField()
    region = StringField()
    image = StringField()
    name = StringField()
    private_ips = ListField(StringField())
    public_ips = ListField(StringField())
    state = StringField()
    extra = DictField()
    isFavorite = StringField()

class Azure(Document):
    meta = {'collection': 'azure'}
    host = StringField()
    region = StringField()
    image = StringField()
    name = StringField()
    private_ips = ListField(StringField())
    public_ips = ListField(StringField())
    state = StringField()
    extra = DictField()
    isFavorite = StringField()
