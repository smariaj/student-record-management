mv ~/Downloads/mern-key.pem ~/Desktop/

cd ~/Desktop

chmod 400 mern-key.pem

ssh -i "mern-key.pem" ubuntu@YOUR_PUBLIC_IP


sudo apt update
sudo apt upgrade -y

sudo apt install curl -y

curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

sudo apt install -y nodejs

sudo apt install git -y

sudo apt install nginx -y

sudo npm install -g pm2

git clone YOUR_GITHUB_REPO_LINK

cd YOUR_PROJECT_FOLDER

cd backend

npm install

Nano .env
PORT=5000
MONGO_URI=

pm2 start server.js --name ecommerce-backend

pm2 list

pm2 save

Pm2 startup
http://YOUR_PUBLIC_IP:5000/api/products

cd ~/YOUR_PROJECT_FOLDER/frontend

npm install

Nano src/App.jsx
http://localhost:5000 - http://publicip:5000

npm run build

sudo rm /var/www/html/index.nginx-debian.html

sudo cp -r dist/* /var/www/html/

sudo nano /etc/nginx/sites-available/default

server {
    listen 80;

    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;
    }
}


sudo systemctl restart nginx

Nano src/App.jsx
http://publicip/api/products - /api/products

Npm run build
sudo cp -r dist/* /var/www/html/

http://public ip

