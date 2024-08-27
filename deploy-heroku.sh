#!/bin/bash

# Ensure Heroku CLI is installed and logged in
heroku login

# Set the app name with a unique identifier based on the current timestamp
APP_NAME="wanderwings-backend-$(date +%s)"

# Create a new Heroku app with the unique name
heroku create $APP_NAME

# Set environment variables
heroku config:set PORT=5000
heroku config:set MONGO_URI=mongodb+srv://dealphaeus:trTVsQoQ8YTH4aLb@cluster0.be1jqxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
heroku config:set JWT_SECRET=wL6vNt/qogrWw4zyCiduf+hQb5krkIMI4OJX8e5hTBAmyA0pEkE5lEyj1PF1wdmN0auXq7hCkrksOCYdnBAyig==
heroku config:set STRIPE_SECRET_KEY=sk_test_51PbHqeHazhScmZJHsYXGxvh0Bbl70Q9BO6tEHTmIXsswGwPzIkXQKcwIOdjClXpFavExeHgXKUBcldmOQomaIvdA00qvsgHEjP
heroku config:set REDIS_HOST=127.0.0.1
heroku config:set REDIS_PORT=6379
heroku config:set PAYPAL_CLIENT_ID=Ad78vEojnfUMhYF4tfT-w0k00zIuNfh2cDfdy-BQOuXYS3Ki4vpmpCMCvE4i67dC4zvw2lENDHX0MUfP
heroku config:set PAYPAL_CLIENT_SECRET=EN0C31jRns5_H9Rk6t8zfGR2z0FXzwWWnCcou7UfNnXtk8nlkyb2ZCwq-VKLm3ewsye-o34PLE88G_Bn
heroku config:set MPESA_CONSUMER_KEY=4ag1hNvPlXuli1a5IjV2WnHT6jyeRAcUe34FLW0rUpskD6S0
heroku config:set MPESA_CONSUMER_SECRET=a12HeVxma2nP8PZWlRtHxwPxgG7Nw1ISm7srLITv4JpEzpKp5Hyw8Wvts3WbY4oD
heroku config:set MPESA_SHORTCODE=N/A
heroku config:set MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
heroku config:set NETLIFY_AUTH_TOKEN=nfp_PgB5vVS3Sn5SShbG6AeySZybCeSzPKaG2fcd
heroku config:set NETLIFY_SITE_ID=8863406b-e348-45d6-9664-3c54f39dffe6
heroku config:set REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyDN6YR6VS85kv6PcQoQl9xQcwrfCQXTVqU
heroku config:set REACT_APP_API_URL=https://wanderwings.netlify.app

# Ensure node_modules and .env are not in source control
echo "node_modules" >> .gitignore
echo ".env" >> .gitignore
git rm -r --cached node_modules
git add .gitignore
git commit -m "Remove node_modules and update .gitignore"

# Ensure the correct build script is present in package.json
if grep -q "\"heroku-postbuild\":" package.json; then
  sed -i 's/\"heroku-postbuild\": \".*\"/\"heroku-postbuild\": \"npm install && npm run build\"/' package.json
else
  sed -i '/"scripts": {/a \ \ \ \ "heroku-postbuild": "npm install && npm run build",' package.json
fi

# Add the build script if not already present
if ! grep -q "\"build\":" package.json; then
  sed -i '/"scripts": {/a \ \ \ \ "build": "react-scripts build",' package.json
fi

# Commit the changes to package.json
git add package.json
git commit -m "Update heroku-postbuild script and add build script"

# Push the code to Heroku
git push heroku main

# Open the app in the browser
heroku open




