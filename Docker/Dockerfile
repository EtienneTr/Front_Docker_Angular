FROM debian:latest

MAINTAINER Etienne Tr

#NODE
RUN apt-get update

RUN apt-get install -y nodejs npm git

COPY ./entrypoint.sh /entrypoint.sh

EXPOSE 3000

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]