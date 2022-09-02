# STL
import datetime

# PDM / PIP
from meteostat import Daily, units


def gather_wx_data(days: int = 90, future: int = 8) -> dict[str, int]:

    # Set time period
    today = datetime.datetime.today()
    end = today + datetime.timedelta(days=future)
    start = today - datetime.timedelta(days=days)

    # set station
    birmingham = "72228"

    # Get daily data
    data = Daily(birmingham, start, end)
    data = data.fetch()

    average_temp_by_day = {}
    for columnName, columnData in data.iterrows():
        columnName = str(columnName)[:10]
        average_temp_by_day[columnName] = units.fahrenheit(columnData.values[0])

    return average_temp_by_day


def get_external_temp(days: int, future: int):
    return gather_wx_data(days, future)[str(datetime.date.today())]


if __name__ == "__main__":
    temps = gather_wx_data()
    for key, value in temps.items():
        print(key, value)

    print(get_external_temp(90, 7))
