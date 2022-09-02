# STL
import datetime
import uuid

# PDM
import psycopg2

# LOCAL
from add_historical import gatherData
from constants import sensor_status
from weather_data import gather_wx_data
from config import config


class Info_Populator:
    def __init__(self, cur, historical, prediction, external_temps, sensor_stats):
        self.db = cur
        self.historical = historical
        self.prediction = prediction
        self.external_temps = external_temps
        self.sensor_status = sensor_stats

        for date, values in self.prediction.items():

            date_uuid = str(uuid.uuid4())
            day = date
            kwh = values[0]
            gallons = values[1]
            cost = values[2]

            assert self.db is not None

            self.db.execute(
                """INSERT INTO date_data
                    (id, day, kwh, gallons, cost)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT DO NOTHING""",
                (
                    date_uuid,
                    day,
                    kwh,
                    gallons,
                    cost,
                ),
            )

    def add_sensor_information(self):
        for sensor, value in self.sensor_status.items():
            sensor_uuid = str(uuid.uuid4())
            name = sensor
            status = value

            assert self.db is not None
            self.db.execute(
                """
                INSERT INTO sensor
                (id, status, name)
                VALUES (%s, %s, %s)
                ON CONFLICT (name)
                DO UPDATE SET status=EXCLUDED.status
                """,
                (
                    sensor_uuid,
                    status,
                    name,
                ),
            )
        return True

    def add_temperature(self, interior_temp=70):
        temp_uuid = "bbe0cf52-4c0f-4b60-9229-01f8cb7200e7"  # just making 1 unique entry
        exterior_temp = gather_wx_data(90)[str(datetime.date.today())]

        assert self.db is not None
        self.db.execute(
            """
            INSERT INTO temperature
            (id, exterior_temp, interior_temp)
            VALUES (%s, %s, %s)
            ON CONFLICT (id)
            DO UPDATE SET exterior_temp=EXCLUDED.exterior_temp, interior_temp=EXCLUDED.interior_temp
            """,
            (
                temp_uuid,
                exterior_temp,
                interior_temp,
            ),
        )
        return True

    def add_date_information(self):
        for date, values in self.historical.items():
            date_uuid = str(uuid.uuid4())
            day = date
            kwh = values[0]
            gallons = values[1]
            cost = values[2]

            assert self.db is not None
            self.db.execute(
                """
                INSERT INTO date_data
                (id, day, kwh, gallons, cost)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (day)
                DO UPDATE SET kwh=EXCLUDED.kwh, gallons=EXCLUDED.gallons, cost=EXCLUDED.cost
                """,
                (
                    date_uuid,
                    day,
                    kwh,
                    gallons,
                    cost,
                ),
            )


        for date, values in self.prediction.items():

            date_uuid = str(uuid.uuid4())
            day = date
            kwh = values[0]
            gallons = values[1]
            cost = values[2]

            assert self.db is not None

            self.db.execute(
                """INSERT INTO date_data
                    (id, day, kwh, gallons, cost)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT DO NOTHING""",
                (
                    date_uuid,
                    day,
                    kwh,
                    gallons,
                    cost,
                ),
            )
        return True


def main():
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        historical, prediction = gatherData()
        external_temps = gather_wx_data()

        populator = Info_Populator(cur, historical, prediction, external_temps, sensor_status)
        populator.add_date_information()
        populator.add_sensor_information()

        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()




if __name__ == "__main__":
    main()
