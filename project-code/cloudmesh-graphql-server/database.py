from mongoengine import connect
from models import AWS, Azure

# You can connect to a real mongo server instance by your own.
connect('cm4', host='mongodb://cm4-user:cm4Us6r@ds151393.mlab.com:51393/cm4', alias='default')

def init_db():
    aws = AWS(host="aws1.amazon.com", region="us-east-1", image="ami-0bbe6b35405ecebdb")
    aws.save()

    azure = Azure(host="azure1.microsoft.com", region="northcentralus", image="Canonical:UbuntuServer:16.04-LTS:latest")
    azure.save()