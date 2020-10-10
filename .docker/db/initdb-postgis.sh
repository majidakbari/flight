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

        CREATE TYPE  NodeDataset AS (id int, code text, city text, country text, name text);
        CREATE TYPE  EdgeDataset AS (id int, source int, destination int, distance float);
        CREATE TYPE NodeEstimateDataType AS (id int, ind int, estimate int, predecessor int);

       CREATE OR REPLACE FUNCTION shortest_path(startnode int, endnode int)
        RETURNS TABLE
                (
                    id          int,
                    airport_id  int,
                    code        varchar,
                    name        varchar,
                    city        varchar,
                    country     varchar
                )
        AS
        $BODY$
        DECLARE
            rowcount   int;
            temprow    NodeEstimateDataType;
            counter    int := 1;
        BEGIN
            -- Create a temporary table for storing the estimates as the algorithm runs
            CREATE TEMP TABLE nodeestimate OF NodeEstimateDataType
            (
                primary key (id, ind)
            ) ON COMMIT DROP;

            CREATE TEMP TABLE result
            (
                id          int,
                airport_id  int,
                ind         int,
                estimate    int,
                predecessor int,
                code        varchar,
                city        varchar,
                name        varchar,
                country     varchar
            ) ON COMMIT DROP;

            -- Fill the temporary table with initial data
            INSERT INTO nodeestimate (id, estimate, predecessor, ind)
            SELECT airport.id, 999999999, 0, 0
            FROM airport
            UNION ALL
            SELECT airport.id, 999999999, 0, 1
            FROM airport
            UNION ALL
            SELECT airport.id, 999999999, 0, 2
            FROM airport
            UNION ALL
            SELECT airport.id, 999999999, 0, 3
            FROM airport
            UNION ALL
            SELECT airport.id, 999999999, 0, 4
            FROM airport;


            -- Set the estimate for the node we start in to be 0.
            UPDATE nodeestimate SET estimate = 0 WHERE nodeestimate.id = startnode AND nodeestimate.ind = 0;

            -- Run the algorithm until we decide that we are finished
            rowcount := 0;
            LOOP
                IF rowcount = 5 then EXIT; END IF;
                for temprow IN
                    SELECT *
                    FROM nodeestimate
                    WHERE nodeestimate.ind = rowcount
                      AND nodeestimate.estimate < 999999999
                    Loop
                        UPDATE nodeestimate n
                        SET estimate    = temprow.estimate + e.distance,
                            predecessor = temprow.id
                        FROM airport_route AS e
                        WHERE n.id = e.target
                          AND n.ind = rowcount + 1
                          AND e.source = temprow.id
                          AND (temprow.estimate + e.distance) < n.estimate;
                    End Loop;
                rowcount := rowcount + 1;
            END LOOP;

            SELECT n.ind
            FROM nodeestimate n
            WHERE n.estimate < 999999999
              and n.id = endnode
            order by n.estimate
            LIMIT 1
            INTO counter;


            INSERT INTO result (SELECT counter,
                                       n.id,
                                       n.ind,
                                       n.estimate,
                                       n.predecessor,
                                       airport.code,
                                       airport.name,
                                       airport.city,
                                       airport.country
                                FROM nodeestimate n
                                         INNER JOIN airport ON airport.id = n.id
                                WHERE n.estimate < 999999999
                                  and n.id = endnode
                                order by estimate
                                LIMIT 1);

            WHILE counter > 0
                LOOP
                    INSERT INTO result (SELECT counter - 1,
                                               n.id,
                                               n.ind,
                                               n.estimate,
                                               n.predecessor,
                                               airport.code,
                                               airport.city,
                                               airport.name,
                                               airport.country
                                        FROM nodeestimate n
                                                 INNER JOIN airport ON airport.id = n.id
                                        WHERE n.estimate < 999999999
                                          and n.id = (SELECT r.predecessor from result r where r.id = counter)
                                          and n.ind = counter - 1
                                        LIMIT 1);
                    counter := counter - 1;
                end loop;

            return query SELECT r.id, r.airport_id, r.code, r.name, r.city, r.country from result r ORDER BY id;

        END;
        $BODY$
            LANGUAGE plpgsql VOLATILE
                             COST 100;
EOSQL