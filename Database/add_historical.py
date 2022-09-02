# STL
import datetime
import random
from typing import Tuple

# LOCAL
from constants import (
    daily_devices,
    electric,
    electric_daily_duration,
    electric_weekend_duration,
    water,
    weekly_devices,
)
from weather_data import gather_wx_data


def getDays(numDays):
    """
    Initializes the list of days <numDays> before today
    """
    base = datetime.datetime.today()
    date_list = [
        base - datetime.timedelta(days=x)
        for x in range(0, numDays, 1 if numDays > 0 else -1)
    ]
    return date_list


def openedDoor(weekday: int):
    """
    Door Opening
    Exterior door is open 30 seconds each time a person enters or leaves the house
    M - F : 16 exit/enter events per day
    S - S : 32 exit/enter events per day
    """
    if weekday < 5:
        return 16
    else:
        return 32


def runHVAC(
    weekday: int, external_temp: float, target_temp: float
) -> tuple[float, float]:
    """
    HVAC Operation
    House Closed - For every 10 deg F difference in external temp, interior temp will +/- 2 deg F per hour
    Open Door - For every 10 deg F difference in external temp, interior temp will +/- 2 deg F per 5 min door is open
    No need to account for Window in historical
    Assumes internal_temp is at target_temp at start of day
    """
    door = openedDoor(weekday) * 0.5 / 5
    closed = 24
    temp_change = abs(target_temp - external_temp) / 10 * (door + closed) * 2
    duration_minutes = temp_change - 2  # inside temp can be +/-2F from target
    watts = electric["HVAC"]
    kWh = watts * duration_minutes / 60 / 1000
    cost = kWh * 0.12
    return kWh, cost


def runElectric(device: str, day: int, time: int = -1) -> float:
    """
    Electricity Operation
    Randomizes amount of on-time for lights (based on constants)
    Checks for weekday or weekend to account for stove, oven, microwave, and TV
    Returns kWh
    """
    watts = electric[device]
    duration_minutes = (
        (
            random.randrange(*electric_daily_duration[device])
            if day < 5
            else electric_weekend_duration[device]
            if (device in electric_weekend_duration)
            else random.randrange(*electric_daily_duration[device])
        )
        if time == -1
        else time
    )
    kWh = watts * duration_minutes / 60 / 1000
    return kWh


def runWHeater(gallons: float) -> float:
    """
    Water Heater Operation
    Calculates amount of energy needed to heat up <gallons> gallons of water
    returns kWh
    """
    heat_time = gallons * 4
    kWh = electric["Hot_water_heater"] * (heat_time / 60) / 1000
    return kWh


def runWater(device: str, amount: int = -1) -> tuple[float, float]:
    """
    Water Operation
    Calculates amount of water and energy needed for water operation
    returns tuple of gallons and energy
    """
    gallons, hot = water[device]
    if amount > 0:
        gallons = amount
    hot *= gallons
    kWh = runWHeater(hot)
    return gallons, kWh


def runBaths(day: int) -> tuple[float, float, float]:
    """
    Daily Bath Operation
    Separated from Water Operation due to multiple uses per day and different weekend use
    Otherwise runs similarly to runWater
    Returns energy, gallons, and cost per day of showers and baths
    """
    showers, baths = 2, 2
    if day > 4:
        showers, baths = 3, 3
    showerG, showerH = water["Master_Bath_water_shower"]
    showerH *= showerG
    bathG, bathH = water["Master_Bath_water_bath"]
    bathH *= bathG
    gallons = showerG * showers + bathG * baths
    hot = showerH * showers + bathH * baths
    kWh = runWHeater(hot)
    cost = kWh * 0.12 + gallons * 2.52 / 748  # 2.52 per 100 ft^3, 100ft^3 per 748 gal
    return kWh, gallons, cost


def runDevice(device: str, day: int) -> tuple[float, float, float]:
    """
    Device Operation
    Runs each daily device (device that is used every day other than baths and showers)
    Returns energy, gallons, and cost of daily operation
    """
    kWh, gallons, cost = 0, 0, 0
    if device in electric:
        kWh += runElectric(device, day)
    if device in water:
        tempG, tempW = runWater(device)
        gallons = tempG
        kWh += tempW
    cost = kWh * 0.12 + gallons * 2.52 / 748  # 2.52 per 100 ft^3, 100ft^3 per 748 gal
    return kWh, gallons, cost


def runDay(
    day: int,
    weeklies_opt: tuple,
    avg_temp: float,
    target_temp: float = 70,  # assuming 70F is the target temp
) -> tuple[float, float, float]:
    """
    Daily Operation
    Runs through baths, showers, daily devices, HVAC, and 4 operations/week devices
    4/week devices get tuple weeklies_opt of booleans to check for operation of (dishwasher, dryer, washer)
    HVAC currently commented out until meteostat API set up to get average temp per day
    Returns energy, gallons, and cost for each day
    """
    kWh, gallons, cost = runBaths(day)

    for device in daily_devices:
        elec, wat, money = runDevice(device, day)
        kWh += elec
        gallons += wat
        cost += money

    wdevices = iter(weekly_devices)
    for choice in weeklies_opt:
        nxt = next(wdevices)
        if choice:
            elec, wat, money = runDevice(nxt, day)
            kWh += elec
            gallons += wat
            cost += money

    elec, money = runHVAC(day, avg_temp, target_temp)
    kWh += elec
    cost += money

    return kWh, gallons, cost


def shuffle(lst: list) -> list:
    """
    Helper function to shuffle list since random.shuffle returns None
    Allows for list comprehension in main
    """
    random.shuffle(lst)
    return lst


def gatherData() -> Tuple[dict[str, tuple], dict[str, tuple]]:
    """
    Compiles and shuffles date data.
    Returns dictionary where keys are dates and values are a tuple of (kWh, gallons, cost)
    """
    weeklies = list(zip(*[shuffle([1, 1, 1, 1, 0, 0, 0]) for _ in range(3)]))
    weather_data = gather_wx_data()
    history = {}
    future = {}
    for day in getDays(90):
        wkday = day.weekday()
        if wkday == 0:
            weeklies = list(zip(*[shuffle([1, 1, 1, 1, 0, 0, 0]) for _ in range(3)]))
        day = str(day)[:10]
        history[day] = runDay(wkday, weeklies[wkday], weather_data[day])
    for day in getDays(-8):
        wkday = day.weekday()
        if wkday == 0:
            weeklies = list(zip(*[shuffle([1, 1, 1, 1, 0, 0, 0]) for _ in range(3)]))
        day = str(day)[:10]
        future[day] = runDay(wkday, weeklies[wkday], weather_data[day])

    return history, future


def simulation_one():
    """
    Simulation One
    Washing Machine for 45 min
    Dryer for 75 min
    Living Room TV for 12 hours
    """
    devices = {
        "Laundry_clothes_washer": 45,
        "Laundry_clothes_dryer": 75,
        "Living_Room_television": 720,
    }
    kWh = sum([runElectric(device, devices[device]) for device in devices])
    cost = kWh * 0.12
    day = str(datetime.date.today())
    return day, (kWh, 0, cost)


def simulation_two():
    """
    Simulation Two
    Shower 80 gallons
    """
    device = "Master_Bath_water_shower"
    gallons, kWh = runWater(device, 80)
    cost = kWh * 0.12 + gallons * 2.52 / 748
    day = str(datetime.date.today())
    return day, (kWh, gallons, cost)


if __name__ == "__main__":
    historical, prediction = gatherData()

    print(simulation_one())
    print(simulation_two())
