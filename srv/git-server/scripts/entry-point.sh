#!/bin/sh

#chmod 777 -R /root/.ssh

#chown root:root /root/.ssh/known_hosts

#chmod 777 -R /root/.ssh

#ssh-keyscan -t ssh-ed25519 localhost > /root/.ssh/known_hosts

#chmod 400 /root/.ssh/id_rsa

#cd /app/server && npm run dev &


set -e

# Get env vars in the Dockerfile to show up in the SSH session
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)
chmod 400 /root/.ssh/id_rsa

echo "Starting SSH ..."
service ssh start

echo "getting host key's fingerprints ..."
ssh-keyscan -t ssh-ed25519 localhost >> /root/.ssh/known_hosts
ssh-keyscan -t ssh-ed25519 ssh-server >> /root/.ssh/known_hosts

echo "wheeling ..."
i=1
while [ "$i" -ne 0 ]
do
  i=1
  sleep 10
  echo "sleep ..."
done

