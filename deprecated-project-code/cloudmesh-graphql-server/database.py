from mongoengine import connect
from models import AWS
from models import Azure
from faker import Faker
import json

fake = Faker()
# You can connect to a real mongo server instance by your own.
connect('cm4', host='mongodb://cm4-user:cm4Us6r@ds151393.mlab.com:51393/cm4', alias='default')

def init_aws():
    for i in range(1, 20):
        region = fake.word(ext_word_list=['us-east-2','us-east-1','us-west-1','us-west-2','us-gov-east-1','us-gov-west-1'])
        aws = AWS(
            host=fake.hostname(), 
            region=region, 
            image=fake.word(ext_word_list=['CC-Ubuntu16.04','CC-Ubuntu14.04','CC-Ubuntu18.04','CC-Ubuntu12.04']), 
            name=fake.user_name(), 
            private_ips=[fake.ipv4_private(), fake.ipv4_private()],
            public_ips=[fake.ipv4(), fake.ipv4()],
            state=fake.word(ext_word_list=['pending','running','stopping','stopped','shutting-down','terminated']),
            extra=json.loads('{\
                "architecture": "x86_64", \
                "availability": "' + region + '", \
                "block_device_mapping": [ \
                    { \
                        "device_name": "/dev/sda1", \
                        "ebs": { \
                            "delete": "true", \
                            "status": "attached", \
                            "volume_id": "vol-0081afab5b6fbe25a" \
                        } \
                    } \
                ], \
                "client_token": "", \
                "dns_name": "ec2-52-89-23-7.' + region + '.compute.amazonaws.com", \
                "ebs_optimized": "false", \
                "groups": [ \
                    { \
                        "group_id": "sg-1f8ae364", \
                        "group_name": "launch-wizard-2" \
                    } \
                ], \
                "hypervisor": "xen", \
                "iam_profile": null, \
                "image_id": "ami-0bbe6b35405ecebdb", \
                "instance_id": "i-0fad7e92ffea8b345", \
                "instance_lifecycle": null, \
                "instance_tenancy": "default", \
                "instance_type": "t2.micro", \
                "kernel_id": null, \
                "key_name": "ec2", \
                "launch_index": 0, \
                "launch_time": "2018-11-09T16:44:04.000Z", \
                "monitoring": "disabled", \
                "network_interfaces": [], \
                "platform": null, \
                "private_dns": "ip-172-31-28-147.us-west-2.compute.internal", \
                "product_codes": [], \
                "ramdisk_id": null, \
                "reason": "", \
                "root_device_name": "/dev/sda1", \
                "root_device_type": "ebs", \
                "source_dest_check": "true", \
                "status": "running", \
                "subnet_id": "subnet-219fd246", \
                "tags": { \
                    "Name": "p1" \
                }, \
                "virtualization_type": "hvm", \
                "vpc_id": "vpc-52182935"}'))
        aws.save()

def init_azure():
    for i in range(1, 20):
        region = fake.word(ext_word_list=['West Central US','West US 2','East US 2','East US','North Central US',
                'South Central US','Central US','West US'])
        azure = Azure(host=fake.hostname(), 
            region=region, 
            image=fake.word(ext_word_list=['CC-Ubuntu16.04','CC-Ubuntu14.04','CC-Ubuntu18.04','CC-Ubuntu12.04']), 
            name=fake.user_name(), 
            private_ips=[fake.ipv4_private(), fake.ipv4_private()],
            public_ips=[fake.ipv4(), fake.ipv4()],
            state=fake.word(ext_word_list=['Starting','Running','Stopping','Stopped','Deallocating','Deallocated']),
            extra=json.loads('{ \
                "id": "/subscriptions/00000a00-00aaa-000a-00aa-000ab00a0000/resourceGroups/CLOUDMESH/providers/Microsoft.Compute/virtualMachines/cm-test-vm-1", \
                "location": "' + region + '", \
                "name": "cm-test-vm-1", \
                "properties": { \
                    "hardwareProfile": { \
                        "vmSize": "Basic_A0" \
                    }, \
                    "networkProfile": { \
                        "networkInterfaces": [ \
                        { \
                            "id": "/subscriptions/00000a00-00aaa-000a-00aa-000ab00a0000/resourceGroups/cloudmesh/providers/Microsoft.Network/networkInterfaces/cm-test-vm-1-nic" \
                        } \
                    ]}, \
                    "osProfile": { \
                        "adminUsername": "azureuser", \
                        "computerName": "cm-test-vm-1", \
                        "linuxConfiguration": { \
                            "disablePasswordAuthentication": true, \
                            "ssh": { \
                                "publicKeys": [ \
                                { \
                                    "keyData": "ssh-rsa bbbb... user@iu.edu", \
                                    "path": "/home/azureuser/.ssh/authorized_keys" \
                                } \
                                ] \
                            } \
                        }, \
                        "secrets": [] \
                    }, \
                    "provisioningState": "Succeeded", \
                    "storageProfile": { \
                        "dataDisks": [], \
                        "imageReference": { \
                            "offer": "UbuntuServer", \
                            "publisher": "Canonical", \
                            "sku": "16.04-LTS", \
                            "version": "latest" \
                        }, \
                        "osDisk": { \
                            "caching": "ReadWrite", \
                            "createOption": "FromImage", \
                            "diskSizeGB": 30, \
                            "name": "cm-test-vm-1", \
                            "osType": "Linux" \
                        } \
                    }, \
                    "vmId": "995784f1-e5b5-4eaa-8fa1-8bfa84386a2d" \
                }, \
                "tags": {}, \
                "type": "Microsoft.Compute/virtualMachines" \
                }'))
        azure.save()