FROM turnkeylinux/core-13.0

MAINTAINER Program3r - josh@findjosh.com

RUN apt-get update



#Installl NVM

RUN git clone https://github.com/creationix/nvm.git /.nvm


#Set Up Local Directory

RUN mkdir /root/local


#Install Cloud 9 IDE

RUN apt-get -y install build-essential g++ curl libssl-dev apache2-utils git libxml2-dev

RUN git clone https://github.com/ajaxorg/cloud9.git

WORKDIR /root/local/cloud9

RUN /bin/bash -c '. /.nvm/nvm.sh && nvm install v0.6.19 && nvm use v0.6.19 && nvm alias cloud9 v0.6.19 && npm install'


#Install Libra

WORKDIR /root/local

RUN git clone https://github.com/Program3r/libra.git

RUN /bin/bash -c '. /.nvm/nvm.sh && nvm install v0.10.25 && nvm use v0.10.25 && nvm alias libra v0.10.25 && nvm alias default'

RUN mkdir /root/local/db

RUN mkdir /root/local/db/libra

WORKDIR /root/local/libra

RUN /bin/bash -c '. /.nvm/nvm.sh && nvm use libra && npm install forever -g && npm install'


#Set Up Projects Folder

RUN mkdir /root/projects

VOLUME ["/root/projects"]


#Expose Ports

EXPOSE 3131

EXPOSE 3000


#Add Libra Config

ADD ./config.js /root/local/libra/config.js

