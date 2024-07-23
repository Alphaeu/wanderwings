#!/bin/bash

# Ensure Heroku CLI is installed and logged in
heroku login

# Set the app name
APP_NAME="wanderwings-$(date +%s)"

# Create a new Heroku app with a unique name
heroku create $APP_NAME

# Set environment variables if needed
# heroku config:set REACT_APP_API_URL=https://api.wanderwings.com

# Ensure node_modules is not in source control
echo "node_modules" >> .gitignore
git rm -r --cached node_modules
git add .gitignore
git commit -m "Remove node_modules and update .gitignore"

# Ensure correct build script in package.json
sed -i 's/\"heroku-postbuild\": \".*\"/\"heroku-postbuild\": \"npm install && npm run build\"/' package.json

# Add build script if not present
if ! grep -q "\"build\":" package.json; then
  sed -i '/"scripts": {/a \ \ \ \ "build": "react-scripts build",' package.json
fi

# Commit changes
git add package.json
git commit -m "Update heroku-postbuild script and add build script"

# Push to Heroku
git push heroku main

# Open the app in the browser
heroku open



