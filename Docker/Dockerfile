FROM ubuntu:14.04

MAINTAINER Etienne Tr

#git & node
RUN apt-get update \
	&& apt-get -y install git \
	&& apt-get -y install curl && curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs

COPY ./entrypoint.sh /entrypoint.sh

ENV PORT=3000

EXPOSE 3000

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]