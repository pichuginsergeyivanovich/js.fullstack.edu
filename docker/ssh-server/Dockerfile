FROM ubuntu:latest

RUN mkdir /var/run/sshd

#SHELL [ "/bin/bash", "-c" ]

#ENV SHELL=/bin/bash

WORKDIR app

RUN apt update && apt install  openssh-server git-core mc sudo gosu curl -y

#RUN apt-get remove npm -y

#RUN apt-get remove nodejs -y

#RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -

#RUN apt-get install nodejs -y

#RUN apt-get install npm -y

#RUN node -v



#RUN useradd -rm -d /home/git -s /bin/bash -g root -G sudo -u 1000 git && \
#    echo 'git:git' | chpasswd && \
#    mkdir -p /home/git/.ssh && \
#    chmod 0700 /home/git/.ssh && \
#    chown -R git /home/git/.ssh

RUN mkdir /root/.ssh

RUN chmod 700 -R /root/.ssh

RUN mkdir /app/server

COPY ./server/ /app/server/

#RUN chown -R git /app/server

COPY ./data/entry-point.sh /app/

#RUN chmod 777 -R /app/

RUN chmod +x /app/entry-point.sh

EXPOSE 22

RUN service ssh start

ENTRYPOINT ["/app/entry-point.sh"]