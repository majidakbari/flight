#!/bin/sh

set -e

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

# Load PostGIS into $POSTGRES_DB
echo "Loading PostGIS extensions into $POSTGRES_DB"

psql --no-password --dbname="$POSTGRES_DB" <<-'EOSQL'
		CREATE EXTENSION IF NOT EXISTS postgis;
		CREATE EXTENSION IF NOT EXISTS postgis_topology;
		CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
		CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;
		CREATE EXTENSION IF NOT EXISTS pgrouting;
EOSQL