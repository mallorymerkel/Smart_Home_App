# PDM
import psycopg2

# LOCAL
from config import config


class Info_Fetcher:
    def __init__(self, cursor):
        self.db = cursor

    def date_query(self):
        sql = "select * from date_data"
        self.db.execute(sql)
        rows = self.db.fetchall()
        return rows

    def temperature_query(self):
        sql = "select * from temperature"
        self.db.execute(sql)
        rows = self.db.fetchall()
        return rows

    def sensor_query(self):
        sql = "select * from sensor"
        self.db.execute(sql)
        rows = self.db.fetchall()
        return rows


def main():
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        populator = Info_Fetcher(cur)
        populator.temperature_query()
        populator.sensor_query()
        populator.date_query()

        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


if __name__ == "__main__":
    main()
