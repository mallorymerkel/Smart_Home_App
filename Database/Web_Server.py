# STL
import datetime
import decimal
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

# PDM
import psycopg2

# LOCAL
from add_historical import simulation_one, simulation_two
from Database.Info_Fetcher import Info_Fetcher


# converter for specific python objects to json
def defaultconverter(o):
    if isinstance(o, datetime.date):
        return o.__str__()
    if isinstance(o, decimal.Decimal):
        return float(o)


# connect to database
hostName = "localhost"
serverPort = 0

conn = psycopg2.connect(
    host="X",
    database="X",
    user="X",
    password="X",
)
cur = conn.cursor()

populator = Info_Fetcher(cur)

# webserver request
class Web_Server(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-type", "application/json")
        self.end_headers()

        # date_data request handler
        if self.path == "/date_data":
            data = populator.date_query()
            data.reverse()
            for el in range(len(data)):
                data[el] = {
                    "id": data[el][0],
                    "date": data[el][1],
                    "kwh": data[el][2],
                    "gallons": data[el][3],
                    "cost": data[el][4],
                    "month": data[el][1].month,
                }
            self.wfile.write(bytes(json.dumps(data, default=defaultconverter), "utf-8"))

        # sensor request handler
        if self.path == "/sensor":
            data = populator.sensor_query()
            for el in range(len(data)):
                data[el] = {
                    "id": data[el][0],
                    "name": data[el][1],
                    "status": data[el][2],
                }
            self.wfile.write(bytes(json.dumps(data, default=defaultconverter), "utf-8"))

        if self.path == "/temperature":
            data = populator.temperature_query()
            for el in range(len(data)):
                data[el] = {
                    "id": data[el][0],
                    "interior_temp": data[el][1],
                    "exterior_temp": data[el][2],
                }
            self.wfile.write(bytes(json.dumps(data, default=defaultconverter), "utf-8"))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def do_POST(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Content-type", "application/json")
        self.end_headers()
        content_length = int(
            self.headers["Content-Length"]
        )  # <--- Gets the size of data
        post_data = json.loads(self.rfile.read(content_length))
        query = ""

        if post_data["name"] == "SIM_ONE" or post_data["name"] == "SIM_TWO":
            date, data = "", ""
            if post_data["name"] == "SIM_ONE":
                date, data = simulation_one()
            elif post_data["name"] == "SIM_TWO":
                date, data = simulation_two()
            kwh = data[0]
            gallons = data[1]
            cost = data[2]
            query = f"""
            UPDATE date_data
            SET kwh = kwh + {kwh}, gallons = gallons +{ gallons}, cost = cost + {cost} WHERE day = '{date}'
            """

        else:
            query = f"UPDATE sensor SET status = { post_data['status']} WHERE name = '{post_data['name']}'"

        cur.execute(query)
        conn.commit()


if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), Web_Server)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    conn.commit()
    cur.close()
    conn.close()
    print("Server stopped.")
