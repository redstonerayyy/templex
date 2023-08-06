FROM nginx

COPY ./example/public /usr/share/nginx/html

EXPOSE 80
