# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# Deployment
- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
-- $ ssh -i "devtinder-secret-key.pem" ubuntu@ec2-16-170-253-178.eu-north-1.compute.amazonaws.com
- Install Node version 
- Git clone 
  
  
- Frontend 
    - npm install -> dependencies install
    - npm run build 
    - sudo apt update 
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance


 - Backend
    - allowed ec2 instance public IP on mongodb server
    - npm install pm2 -g
    - pm2 start npm --name "devtinder-backend" --start
    - pm2 logs
    - pm2 list, pm2 flush <name>, pm2 delete <name>
    - config nginx -/etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASE_URL in frontend project to "/api"


# nginx config
