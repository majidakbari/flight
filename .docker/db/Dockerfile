FROM postgres:12
LABEL maintainer="Majid Akbari <majidakbariiii@gmail.com>"
ENV POSTGIS_MAJOR 3
ENV POSTGIS_VERSION 3.0.2+dfsg-2.pgdg100+1
RUN apt-get update &&\
    apt-cache showpkg postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR &&\
    apt-get install -y --no-install-recommends \
        postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR=$POSTGIS_VERSION \
        postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts=$POSTGIS_VERSION \
        postgresql-12-pgrouting &&\
    rm -rf /var/lib/apt/lists/*
RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./initdb-postgis.sh /docker-entrypoint-initdb.d/postgis.sh
COPY ./functions.sh /docker-entrypoint-initdb.d/functions.sh
RUN chmod +x /docker-entrypoint-initdb.d/*