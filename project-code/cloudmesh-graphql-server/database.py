from mongoengine import connect
from models import AWS
from models import Azure
from faker import Faker

fake = Faker()
# You can connect to a real mongo server instance by your own.
connect('cm4', host='mongodb://cm4-user:cm4Us6r@ds151393.mlab.com:51393/cm4', alias='default')

def init_db():
    for i in range(1, 20):
        aws = AWS(
            host=fake.hostname(), 
            region=fake.word(ext_word_list=['us-east-2','us-east-1','us-west-1','us-west-2','us-gov-east-1','us-gov-west-1']), 
            image='ami-' + fake.md5()[:17], 
            name=fake.user_name(), 
            private_ips=[fake.ipv4_private(), fake.ipv4_private()],
            public_ips=[fake.ipv4(), fake.ipv4()],
            state=fake.word(ext_word_list=['pending','running','stopping','stopped','shutting-down','terminated']))
        aws.save()

        azure = Azure(host=fake.hostname(), 
            region=fake.word(ext_word_list=['West Central US','West US 2','East US 2','East US','North Central US',
                'South Central US','Central US','West US']), 
            image='ami-' + fake.md5()[:17], 
            name=fake.user_name(), 
            private_ips=[fake.ipv4_private(), fake.ipv4_private()],
            public_ips=[fake.ipv4(), fake.ipv4()],
            state=fake.word(ext_word_list=['Starting','Running','Stopping','Stopped','Deallocating','Deallocated']))
        azure.save()