// Yarn
import React, { useEffect, useState } from "react";
import { Spin, Tabs } from "antd";
import {
  HomeOutlined,
  LineChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";

// Local
import { HomeAppContext } from "../Common";
import { ScreenOne } from "../pages/ScreenOne";
import { ScreenTwo } from "../pages/ScreenTwo";
import { ScreenThree } from "../pages/ScreenThree";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const TabBar = (props) => {
  const [dateData, setDateData] = useState({
    data: [],
    isFetching: false,
  });
  const [filterSelected, setFilterSelected] = useState(2);

  const [sensorData, setSensorData] = useState({
    data: [],
    isFetching: false,
  });
  const [temperatureData, setTemperatureData] = useState({
    data: [],
    isFetching: false,
  });

  useEffect(() => {
    const fetchDateData = async () => {
      try {
        setDateData({ data: dateData.data, isFetching: true });
        const response = await axios.get("http://localhost:8081/date_data");
        setDateData({ data: response.data, isFetching: false });
      } catch (e) {
        console.log(e);
        setDateData({ data: dateData.data, isFetching: false });
      }
    };
    fetchDateData();
  }, []);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        setSensorData({
          data: sensorData.data,
          isFetching: true,
        });
        const response = await axios.get("http://localhost:8081/sensor");
        setSensorData({ data: response.data, isFetching: false });
      } catch (e) {
        console.log(e);
        setSensorData({
          data: sensorData.data,
          isFetching: false,
        });
      }
    };
    fetchSensorData();
  }, []);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        setTemperatureData({
          data: temperatureData.data,
          isFetching: true,
        });
        const response = await axios.get("http://localhost:8081/temperature");
        setTemperatureData({
          data: response.data,
          isFetching: false,
        });
      } catch (e) {
        console.log(e);
        setTemperatureData({
          data: temperatureData.data,
          isFetching: false,
        });
      }
    };
    fetchTemperatureData();
  }, []);

  function changeTwoMonthsAgo() {
    setFilterSelected(0);
  }
  function changeLastMonth() {
    setFilterSelected(1);
  }
  function changeThisMonth() {
    setFilterSelected(2);
  }

  let filteredData;
  if (filterSelected === 0) {
    filteredData = dateData.data.filter(function (el) {
      return el.month == 2;
    });
  } else if (filterSelected === 1) {
    filteredData = dateData.data.filter(function (el) {
      return el.month == 3;
    });
  } else if (filterSelected === 2) {
    filteredData = dateData.data.filter(function (el) {
      return el.month == 4;
    });
  }

  return (
    <HomeAppContext.Provider
      value={{
        dateData: dateData.data,
        sensorData: sensorData.data,
        temperatureData: temperatureData.data,
      }}
    >
      <>
        {!dateData.isFetching &&
        !sensorData.isFetching &&
        !temperatureData.isFetching ? (
          <>
            <Tabs
              defaultActiveKey="1"
              onChange={callback}
              centered
              style={{ marginBottom: 32 }}
            >
              <TabPane
                tab={
                  <span>
                    <HomeOutlined />
                    Floorplan
                  </span>
                }
                key="1"
              >
                {" "}
                <ScreenOne />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <LineChartOutlined />
                    Usage History
                  </span>
                }
                key="2"
              >
                <div className="monthButtonContainer">
                  <button className="monthButton" onClick={changeTwoMonthsAgo}>
                    two months ago
                  </button>
                  <button className="monthButton" onClick={changeLastMonth}>
                    last month
                  </button>
                  <button className="monthButton" onClick={changeThisMonth}>
                    this month
                  </button>
                </div>
                <ScreenTwo
                  temperatureData={temperatureData}
                  sensorData={sensorData}
                  dateData={filteredData}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <SettingOutlined />
                    Dev Tools
                  </span>
                }
                key="3"
              >
                {" "}
                <ScreenThree />
              </TabPane>
            </Tabs>
            {/* refetch={refetch} */}
          </>
        ) : (
          <div style={{ position: "absolute", top: "50%", right: "50%" }}>
            <Spin size="large" />
          </div>
        )}
      </>
    </HomeAppContext.Provider>
  );
};

export { TabBar };
