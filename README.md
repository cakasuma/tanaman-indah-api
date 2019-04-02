# Plant Store API
Tanaman indah API is simple but robust interface to process the backend of Tanaman indah application

# How to run
- install node and npm
- git clone
- npm install
- npm run serve

# Models available
- Feedback

# Note
- create your own mongodb and configure it in your .env variable

# Admin view route
- `/` home page (index)
- `/add` add plant page (add)
- `/view` view plant page (view)

# API
Tanaman indah API consists of the followings
1. Plants ('/plant')
- Post (reqest: `body`, response: `single json object`)
- Put (request: `params`, response: `single json object`)
- Get (request: `-`, response: `json objects`)
- Get (request: `params`, response: `single json object`)
- Delete (request: `params`, response: `single json object`)

2. Feedback ('/feedback')
- Post (reqest: `body`, response: `single json object`)
- Get (request: `-`, response: `json objects`)
- Get (request: `params`, response: `single json object`)
- Delete (request: `params`, response: `single json object`)