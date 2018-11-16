from mongoengine import connect
from models import AWS
from models import Azure
from faker import Faker

fake = Faker()
# You can connect to a real mongo server instance by your own.
connect('cm4', host='mongodb://cm4-user:cm4Us6r@ds151393.mlab.com:51393/cm4', alias='default')

def init_db():
    aws = AWS(
        host=fake.hostname(), 
        region="us-east-1", 
        image="ami-0bbe6b35405ecebdb", 
        name=fake.user_name(), 
        private_ips=[fake.ipv4_private(), fake.ipv4_private()],
        public_ips=[fake.ipv4(), fake.ipv4()],
        state="running")
    aws.save()

    azure = Azure(host=fake.hostname(), 
        region="us-east-1", 
        image="ami-0bbe6b35405ecebdb", 
        name=fake.user_name(), 
        private_ips=[fake.ipv4_private(), fake.ipv4_private()],
        public_ips=[fake.ipv4(), fake.ipv4()],
        state="running")
    azure.save()