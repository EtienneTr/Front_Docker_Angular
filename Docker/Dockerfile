FROM debian:unstable

MAINTAINER Etienne Tr

#NODE
RUN apt-get update

RUN apt-get install -y nodejs npm git

# symlink node to nodejs
RUN ln /usr/bin/nodejs /usr/bin/node

COPY ./entrypoint.sh /entrypoint.sh

EXPOSE 3000

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]