#!/bin/sh

set -e

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

# Load PostGIS into $POSTGRES_DB
echo "Creating shortest path functions into $POSTGRES_DB"

psql --no-password --dbname="$POSTGRES_DB" <<-'EOSQL'

    CREATE TYPE  NodeDataset AS (id int, code text, city text, country text, name text);
    CREATE TYPE  EdgeDataset AS (id int, source int, destination int, distance float);
    CREATE TYPE NodeEstimateDataType AS (id int, ind int, estimate int, predecessor int);



CREATE OR REPLACE FUNCTION shortest_path(start_node int, end_node int, max_nodes int)
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
    temp_row    NodeEstimateDataType;
    counter    int := 1;
    index    int := max_nodes;
BEGIN
    -- Check arguments
    IF max_nodes < 2 THEN
        raise exception 'Number of nodes can not be lower than 2';
    END IF;

    -- Create a temporary table for storing the estimates as the algorithm runs
    CREATE TEMP TABLE node_estimate OF NodeEstimateDataType
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
    WHILE index > 0
        LOOP
            INSERT INTO node_estimate (id, estimate, predecessor, ind)
                (SELECT airport.id, 999999999, 0, index - 1
                 FROM airport);
            index := index - 1;
        end loop;


    -- Set the estimate for the node we start in to be 0.
    UPDATE node_estimate SET estimate = 0 WHERE node_estimate.id = start_node AND node_estimate.ind = 0;

    -- Run the algorithm until we decide that we are finished
    rowcount := 0;
    LOOP
        IF rowcount = max_nodes then EXIT; END IF;
        for temp_row IN
            SELECT *
            FROM node_estimate
            WHERE node_estimate.ind = rowcount
              AND node_estimate.estimate < 999999999
            Loop
                UPDATE node_estimate n
                SET estimate    = temp_row.estimate + e.distance,
                    predecessor = temp_row.id
                FROM airport_route AS e
                WHERE n.id = e.target
                  AND n.ind = rowcount + 1
                  AND e.source = temp_row.id
                  AND (temp_row.estimate + e.distance) < n.estimate;
            End Loop;
        rowcount := rowcount + 1;
    END LOOP;

    SELECT n.ind
    FROM node_estimate n
    WHERE n.estimate < 999999999
      and n.id = end_node
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
                        FROM node_estimate n
                                 INNER JOIN airport ON airport.id = n.id
                        WHERE n.estimate < 999999999
                          and n.id = end_node
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
                                FROM node_estimate n
                                         INNER JOIN airport ON airport.id = n.id
                                WHERE n.estimate < 999999999
                                  and n.id = (SELECT r.predecessor from result r where r.id = counter)
                                  and n.ind = counter - 1
                                LIMIT 1);
            counter := counter - 1;
        end loop;

    return query SELECT r.id, r.airport_id, r.code, r.name, r.city, r.country from result r ORDER BY id;

END
$BODY$
    LANGUAGE plpgsql VOLATILE
                     COST 100;

Create OR REPLACE FUNCTION shortest_path_augmented(start_node integer, end_node integer, max_nodes integer)
    returns TABLE
            (
                id         int,
                airport_id int,
                code       varchar,
                name       varchar,
                city       varchar,
                country    varchar
            )
    language plpgsql
as
$$
DECLARE
    rowcount int;
    temp_row NodeEstimateDataType;
    counter  int := 1;
    index    int := 2 * (max_nodes - 1);
BEGIN
    -- Check arguments
    IF max_nodes < 2 THEN
        raise exception 'Number of nodes can not be lower than 2';
    END IF;

    -- Create a temporary table for storing the estimates as the algorithm runs
    CREATE TEMP TABLE node_estimate OF NodeEstimateDataType
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
        --         unique(airport_id)
    ) ON COMMIT DROP;

    -- Fill the temporary table with initial data
    WHILE index > 0
        LOOP
            INSERT INTO node_estimate (id, estimate, predecessor, ind)
                (SELECT airport.id, 999999999, 0, index - 1
                 FROM airport);
            index := index - 1;
        end loop;


    -- Set the estimate for the node we start in to be 0.
    UPDATE node_estimate SET estimate = 0 WHERE node_estimate.id = start_node AND node_estimate.ind = 0;

    -- Run the algorithm until we decide that we are finished
    rowcount := 0;
    LOOP
        IF rowcount = 2 * (max_nodes - 1) then EXIT; END IF;
        for temp_row IN
            SELECT *
            FROM node_estimate
            WHERE node_estimate.ind = rowcount
              AND node_estimate.estimate < 999999999
            Loop
                IF MOD(rowcount, 2) = 0 THEN
                    UPDATE node_estimate n
                    SET estimate    = temp_row.estimate + e.distance,
                        predecessor = temp_row.id
                    FROM airport_route AS e
                    WHERE n.id = e.target
                      AND n.ind = rowcount + 1
                      AND e.source = temp_row.id
                      AND (temp_row.estimate + e.distance) < n.estimate;
                ELSE
                    UPDATE node_estimate n
                    SET estimate    = temp_row.estimate + e.distance,
                        predecessor = temp_row.id
                    FROM imaginary_airport_route AS e
                    WHERE n.id = e.target
                      AND n.ind = rowcount + 1
                      AND e.source = temp_row.id
                      AND (temp_row.estimate + e.distance) < n.estimate;
                END IF;
            End Loop;
        rowcount := rowcount + 1;
    END LOOP;

    SELECT n.ind
    FROM node_estimate n
    WHERE n.estimate < 999999999
      and n.id = end_node
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
                        FROM node_estimate n
                                 INNER JOIN airport ON airport.id = n.id
                        WHERE n.estimate < 999999999
                          and n.id = end_node
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
                                FROM node_estimate n
                                         INNER JOIN airport ON airport.id = n.id
                                WHERE n.estimate < 999999999
                                  and n.id = (SELECT r.predecessor from result r where r.id = counter)
                                  and n.ind = counter - 1
                                LIMIT 1)
            on conflict do nothing;
            counter := counter - 1;
        end loop;

    return query SELECT (row_number() over (ORDER BY r.estimate))::int - 1 as id,
                        r.airport_id,
                        r.code,
                        r.name,
                        r.city,
                        r.country
                 from result r
                 group by (r.estimate, r.airport_id, r.code, r.name, r.city, r.country);

END
$$;
EOSQL