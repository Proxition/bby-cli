const docker = `
FROM alpine:3.8
RUN apk add --no-cache --virtual .gyp python make g++ nodejs npm
RUN npm i -g pm2
RUN npm i -g http-server
RUN pm2 install pm2-logrotate
WORKDIR /usr/src/app
COPY package*.json ./
COPY dist .
RUN npm install
COPY . .
EXPOSE 26500
CMD ["npm", "run", "start-http"]
`

const dockerCompose = `
  version: '3'

services:
    elasticsearch:
        build:
            context: elasticsearch/
            args:
                ELK_VERSION: $ELK_VERSION
        volumes:
            - ./elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml:ro
        ports:
            - "9200:9200"
            - "9300:9300"
        environment:
            ES_JAVA_OPTS: "-Xmx256m -Xms256m"
        networks:
            - $ELK_NETWORKNAME

    kibana:
        build:
            context: kibana/
            args:
                ELK_VERSION: $ELK_VERSION
        volumes:
            - ./kibana/config/:/usr/share/kibana/config:ro
        ports:
            - "5601:5601"
        networks:
            - $ELK_NETWORKNAME
        depends_on:
            - elasticsearch

    insertProjectName:
        build: .
        ports:
            - "44800:44800"
        environment:
            ELASTICSEARCH_BASE_URL: "http://elasticsearch:9200"
        depends_on:
            - elasticsearch
        networks:
            - $ELK_NETWORKNAME

networks:
  $ELK_NETWORKNAME:
        driver: bridge
`


module.exports = {
  docker,
  dockerCompose
}
