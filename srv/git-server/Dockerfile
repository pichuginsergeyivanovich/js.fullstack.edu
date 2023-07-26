FROM ubuntu:latest

RUN mkdir /var/run/sshd

WORKDIR app


RUN apt update && apt install ssh openssh-server sudo curl -y

#--------------------------git stuff


RUN useradd -rm -d /home/git -s /bin/bash git

RUN echo 'git:git' | chpasswd

RUN mkdir -p /home/git/.ssh && \
    chmod 0700 /home/git/.ssh

COPY id_rsa.pub /home/git/.ssh/authorized_keys

RUN chown -R git:git /home/git/.ssh && \
    chmod 600 /home/git/.ssh/authorized_keys

#--------------------------ssh stuff

RUN mkdir /root/.ssh 
RUN chmod 777 -R /root/.ssh

COPY id_rsa.pub /root/.ssh/id_rsa.pub
COPY id_rsa /root/.ssh/id_rsa


#RUN service ssh start

EXPOSE 22


#--------------------------node stuff

#RUN apt-get remove npm -y

#RUN apt-get remove nodejs -y

#RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -

#RUN apt-get install nodejs -y

##RUN apt-get install npm -y

#RUN node -v

#--------------------------deploy project into container

#RUN mkdir /app/server

#COPY ./server/ /app/server/

#RUN chown -R git /app/server

#RUN chmod 777 -R /app/

#--------------------------start script stuff

COPY ./scripts/entry-point.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entry-point.sh

ENTRYPOINT ["/usr/local/bin/entry-point.sh"]


