#!/bin/sh

ssh-keygen -t rsa -f /root/.ssh/id_rsa -y >>/home/git/.ssh/authorized_keys && chown -R git /home/git/.ssh

cd /app/server && npm run dev &

service ssh start &
/usr/sbin/sshd -D && sh
