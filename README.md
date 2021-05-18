Chia-Dashboard-UI
======

The UI powering https://dashboard.chia.foxypool.io. No support for users self-hosting, you are on your own.

Installation
======

1) Clone this Repo
2) Install Angualr, Yarn & Nginx
3) Adjust configuration (OAuth, URL) in config.ts
4) Install Dependencies
5) Run "yarn run build"
6) Populate the dist directory with nginx

Example Nginx Configuration:

server {
        server_name eu.chiadashboard.com;
        access_log /var/log/nginx/reverse-access.log;
        error_log /var/log/nginx/reverse-error.log;

        location / {
        index index.html index.htm;
        root /dashboard;
         try_files $uri $uri/ /index.html;
		}
		location /api {
        proxy_pass http://127.0.0.1:5000/api;
		}



        server_name eu.chiadashboard.com;
        listen 80 default_server;
        listen [::]:80 default_server;
        
    
}

