CREATE TABLE IF NOT EXISTS sensor (
    id              uuid            PRIMARY KEY,
    name            text            UNIQUE NOT NULL,
    status          boolean         NOT NULL
);

CREATE TABLE IF NOT EXISTS temperature (
    id              uuid            PRIMARY KEY,
    interior_temp   decimal         NOT NULL,
    exterior_temp   decimal         NOT NULL
);

CREATE TABLE IF NOT EXISTS date_data (
    id              uuid            PRIMARY KEY,
    day             date            UNIQUE NOT NULL,
    kwh             decimal         NOT NULL,
    gallons         int             NOT NULL,
    cost            decimal         NOT NULL
);

GRANT USAGE ON SCHEMA public TO Team8;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO Team8;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO Team8;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO Team8;
GRANT SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO Team8;
