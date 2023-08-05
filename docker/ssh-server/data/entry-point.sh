#!/bin/sh
echo 'touch /root/.ssh/id_rsa'
touch /root/.ssh/id_rsa 

echo 'ssh-keygen -t rsa -f /root/.ssh/id_rsa'
yes 'y' | ssh-keygen -t rsa -N '' -f /root/.ssh/id_rsa

echo 'chmod 600 /root/.ssh/id_rsa'
chmod 600 /root/.ssh/id_rsa 

echo 'cat /root/.ssh/id_rsa.pub >>/home/git/.ssh/authorized_keys'
cat /root/.ssh/id_rsa.pub >>/home/git/.ssh/authorized_keys

chmod 600 /home/git/.ssh/authorized_keys

echo 'chown -R git /home/git/.ssh'
chown -R git /home/git/.ssh

#cd /app/server && npm run dev &

service ssh start &
/usr/sbin/sshd -Dd && bash
