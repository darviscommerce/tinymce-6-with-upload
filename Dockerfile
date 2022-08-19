FROM php:8.1.0alpha3-apache
# RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
# RUN a2enmod rewrite
# RUN service apache2 restart

#docker build  -t ihitro/php53-apache --no-cache .
#docker run -p 5001:80 -v $(pwd):/var/www/html ihitro/php53-apache