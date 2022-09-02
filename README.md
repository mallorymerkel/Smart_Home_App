# Smart_Home_App

This repository contains the group project for UAB CS 499 Capstone, Spring 2022.

### Project Description:

The advancement of smart homes in recent years has evolved very quickly. The variety of sensors, monitors, automation, and human interface options are almost endless. The Home IoT project will simulate sensor data and user interaction with a smart home. There are two main parts to the project – 1. Sensor data generation and 2. User interaction (inputs and outputs) with the system.  The project will handle both current state information (I.e. what are the sensors indicating right now) and historical information (I.e. what did the sensors report for the last X days).

### Application Requirements:

ApplicationType: web application with web services

LanguageOptions: HTML, CSS, React17, SQL, Python

Database:PostgreSQL

UserInput Requirements:

* Menu selection
* Sensor manipulation
  * Open and close doors
  * Turn lights and TV on/off
  * Set thermostat
  * Etc.

System Response Requirements:

* Screen graphics
* Screen text
* Utility usage and cost calculations

  * Historical and predicted for current month.

Exact questions to be answered:

* What is the current state of x sensor?
* What was the water usage last week?
* How	much electricity do we expect to use next week?
* How	much electricity did we use last week and how did it compare to the estimate?
* What is the current estimated monthly electric and water expenses?

House Detail:

* Single story slab home
* 2 adults, 2 kids
* 3 Bed (overhead light, two lamps, 1 TV in master bedroom, 2 windows)
* 2 Bath (overhead light, exhaust fan, 1 window)
* 2 car attached garage (two garage doors)
* Clothes washer and dryer
* 3 exterior doors (front, back, house into garage)
* Living room (overhead light, two lamps, TV, 3 windows)
* Kitchen (overhead light, stove, oven, microwave, refrigerator, dishwasher, 2 windows)

IoT Sensor Data Sources:

* Door sensor (exterior doors and garage doors)
* Window sensors
* Water flow (kitchen, bathrooms (sink/shower), outside faucet)
* Lights on/off
* HVAC (external temp, internal temp, thermostat high/low settings)
  * External temp history and real time readings from online source
