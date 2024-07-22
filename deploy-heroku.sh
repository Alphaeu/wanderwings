#!/bin/bash

APP_NAME="wanderwings"

# Log in to Heroku
heroku login

# Create a new Heroku app
heroku apps:create $APP_NAME

# Set up Git for Heroku
git init
heroku git:remote -a $APP_NAME

# Deploy the app
git add .
git commit -m "Deploy to Heroku"
git push heroku main


