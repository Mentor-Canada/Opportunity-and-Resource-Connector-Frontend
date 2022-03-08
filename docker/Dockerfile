FROM ubuntu:latest

RUN groupadd -g 1000 ubuntu
RUN useradd -ms /bin/bash ubuntu -u 1000 -g 1000
RUN usermod -aG sudo ubuntu

RUN apt-get update

# Install apache, PHP, and supplimentary programs. curl and lynx-cur are for debugging the container.
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install apache2

# Enable apache mods.
RUN a2enmod rewrite
RUN a2enmod headers

# Manually set up the apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

EXPOSE 80

# By default, simply start apache.
CMD /usr/sbin/apache2ctl -D FOREGROUND