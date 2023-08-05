FROM ubuntu:latest
#RUN apk add --no-cache libc6-compat
WORKDIR /app
#ENV NODE_ENV production

RUN apt-get update && \
    apt-get install -y -qq --no-install-recommends git mc nano curl openssh-server net-tools && \
    rm -rf /var/cache/apk

COPY dist/. ./dist
COPY repo/. ./repo

#COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/public-app/.next ./.next
COPY package.json ./package.json
COPY node_modules/. ./node_modules
#RUN npm install --ignore-scripts --prefer-offline && rm -rf /usr/local/share/.cache

RUN useradd -rm -d /home/git -s /bin/bash -g root -G sudo -u 1001 git -s /bin/bash

RUN echo 'git:git' | chpasswd
RUN echo 'PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin"' >> /home/git/.profile
RUN su git
RUN mkdir /home/git/.ssh && chmod 700 /home/git/.ssh && chown -R git /home/git/.ssh
COPY ./src/id_rsa ./src/id_rsa.pub /home/git/.ssh/
#RUN touch /home/git/.ssh/authorized_keys && chmod 600 /home/git/.ssh/authorized_keys
RUN cat /home/git/.ssh/id_rsa.pub >> /home/git/.ssh/authorized_keys
COPY ./entrypoint.sh ./ 
RUN chmod +x ./entrypoint.sh
USER root

EXPOSE 22
EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
#ENTRYPOINT /app/script.sh

#CMD ["npm", "run", "dev"]
#CMD ["/var/sshd", "-D"]

