import * as pg from 'pg';

const { Pool } = pg.default;

const pool = new Pool({
    connectionString : `techupth://postgres:PAL52qvzhT4C@$X@localhost:5432/checkpoint`
});

export { pool };