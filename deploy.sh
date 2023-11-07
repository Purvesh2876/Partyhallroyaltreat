#!/bin/bash

# Set the path to your deployment key
DEPLOYMENT_KEY="/root/.ssh/id_rsa"

# Get the latest changes from the remote repository using the deployment key
GIT_SSH_COMMAND="ssh -i $DEPLOYMENT_KEY" git pull

# Install any necessary dependencies
npm install

# Restart the server
pm2 restart JG
