FROM ubuntu:latest

WORKDIR app

RUN apt update && apt install  openssh-server git-core mc sudo gosu curl -y

RUN apt-get remove npm -y

RUN apt-get remove nodejs -y

RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -

RUN apt-get install nodejs -y

#RUN apt-get install npm -y

RUN node -v

RUN mkdir /var/run/sshd

RUN useradd -rm -d /home/git -s /bin/bash -g root -G sudo -u 1000 git && \
    echo 'git:git' | chpasswd && \
    mkdir -p /home/git/.ssh && \
    chmod 0700 /home/git/.ssh && \
    chown -R git /home/git/.ssh

RUN mkdir /root/.ssh

RUN service ssh start

EXPOSE 22

RUN mkdir /app/server

RUN chmod 777 -R /app/

COPY ./server/ /app/server/

RUN chown -R git /app/server

CMD ["/app/entry-point.sh"]
