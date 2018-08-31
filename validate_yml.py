#!/usr/bin/env python3
# validate_yml.py : Validate README.yml file
# Mihir Shanishchara, 2018
# Open README.yml and dump

import sys
from ruamel.yaml import YAML

input_readme = open("README.yml").read()

yaml = YAML()
yaml.dump(yaml.load(input_readme), sys.stdout)