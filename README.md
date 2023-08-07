# HTTP Server Implant

This is a basic project, for a simple web server that triggers a webhook when it is reached. The purpose is to act similar to a CanaryToken, where this server sits in an environment and alerts when it is reached, indicating potential unauthorized users on the network. I built this application to learn how docker works, and also because I wanted a simple implant like this, that does not require the client to hit another URL for the alert to be triggered (i.e. embedding a CanaryToken webhook into a webpage with "\<img src='canary token'>"). It works with any webhook, but I have tested it and deployed it using a Discord webhook.

## Usage
Pull the image:
```
sudo docker pull marzshine/http-server-implant
```

Run a container:
```
sudo docker run -d -p 3000:3000 --env WEBHOOK_TARGET=your_webhook marzshine/http-server-implant
```

## Output
When the server is requested, it will post to the webhook with content set to:
```Request received to honeypot server with the following information: 
::ffff:172.17.0.1 : GET : /oRAdbgs9RsVN.html : 200 : 
Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0) :
Mon Aug 07 2023 17:35:38 GMT+0000 (Coordinated Universal Time)
```

It provides the IP address, request type (the server will respond to ANY http request), response status, useragent, and timestamp