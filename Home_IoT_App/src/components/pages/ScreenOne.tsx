// Yarn
import React, { useContext } from "react";
import {
  InputNumber,
  Divider,
  Space,
  Switch,
  Row,
  Col,
  Card,
  Input,
} from "antd";

// Local
import { HomeAppContext } from "../Common";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";

const ScreenOne = () => {
  let { sensorData, temperatureData } = useContext(HomeAppContext);

  let status_dict = {};
  for (let i = 0; i < sensorData.length; i++) {
    status_dict[sensorData[i].name] = sensorData[i].status;
  }

  async function postData(key, value) {
    let update = {
      name: key,
      status: value,
    };

    try {
      const response = await axios.post("http://localhost:8081/sensor", update);
      console.log("Request successful!");
    } catch (error) {
      if (error.response) {
        console.log(error.reponse.status);
      } else {
        console.log(error.message);
      }
    }
  }
  const onTempChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const onChange = (checkedValues, checkedChildren) => {
    let stat = false;
    for (let i = 0; i < sensorData.length; i++) {
      if (sensorData[i].name === checkedChildren.target.innerText) {
        if (checkedValues === false) {
          sensorData[i].status = false;
        } else {
          sensorData[i].status = true;
        }
        stat = sensorData[i].status;
      }
    }
    postData(checkedChildren.target.innerText, stat);
  };

  const words = [
    "Life doesn’t make any sense without interdependence. We need each other, and the sooner we learn that, the better for us all.” –Erik Erikson",
    "“Once you start making the effort to ‘wake yourself up’—that is, be more mindful in your activities—you suddenly start appreciating life a lot more.” –Robert Biswas-Diener",
  ];

  return (
    <>
      <Space>
        Thermostat
        <InputNumber
          min={0}
          max={99}
          defaultValue={temperatureData[0]?.interior_temp}
          onChange={onTempChange}
        />
        Outside Temperature
        <InputNumber
          min={-50}
          max={150}
          defaultValue={temperatureData[0]?.exterior_temp}
          onChange={onTempChange}
          disabled={true}
        />
      </Space>

      <Divider orientation="left"></Divider>

      <Row>
        <Col span={3}>
          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Kitchen" style={{ width: 250 }}>
                <Space>
                  <Col>
                    <Row>
                      <Switch
                        checkedChildren="kitchen_overhead_light"
                        unCheckedChildren="kitchen_overhead_light"
                        defaultChecked={status_dict["kitchen_overhead_light"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="kitchen_window_1"
                        unCheckedChildren="kitchen_window_1"
                        defaultChecked={status_dict["kitchen_window_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="kitchen_window_2"
                        unCheckedChildren="kitchen_window_2"
                        defaultChecked={status_dict["kitchen_window_2"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="kitchen_water"
                        unCheckedChildren="kitchen_water"
                        defaultChecked={status_dict["kitchen_water"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="kitchen_stove"
                        unCheckedChildren="kitchen_stove"
                        defaultChecked={status_dict["kitchen_stove"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="kitchen_microwave"
                        unCheckedChildren="kitchen_microwave"
                        defaultChecked={status_dict["kitchen_microwave"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="kitchen_refrigerator"
                        unCheckedChildren="kitchen_refrigerator"
                        defaultChecked={status_dict["kitchen_refrigerator"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="kitchen_dishwasher"
                        unCheckedChildren="kitchen_dishwasher"
                        defaultChecked={status_dict["kitchen_dishwasher"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="kitchen_door_out"
                        unCheckedChildren="kitchen_door_out"
                        defaultChecked={status_dict["kitchen_door_out"]}
                        onChange={onChange}
                      />
                    </Row>
                  </Col>
                </Space>
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Living Room" style={{ width: 250 }}>
                <Space>
                  <Col>
                    <Row>
                      <Switch
                        checkedChildren="livingroom_overhead_light"
                        unCheckedChildren="livingroom_overhead_light"
                        defaultChecked={
                          status_dict["livingroom_overhead_light"]
                        }
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="livingroom_window_1"
                        unCheckedChildren="livingroom_window_1"
                        defaultChecked={status_dict["livingroom_window_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="livingroom_window_2"
                        unCheckedChildren="livingroom_window_2"
                        defaultChecked={status_dict["livingroom_window_2"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="livingroom_window_3"
                        unCheckedChildren="livingroom_window_3"
                        defaultChecked={status_dict["livingroom_window_3"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="livingroom_lamp_1"
                        unCheckedChildren="livingroom_lamp_1"
                        defaultChecked={status_dict["livingroom_lamp_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="livingroom_lamp_2"
                        unCheckedChildren="livingroom_lamp_2"
                        defaultChecked={status_dict["livingroom_lamp_2"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="livingroom_television"
                        unCheckedChildren="livingroom_television"
                        defaultChecked={status_dict["livingroom_television"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="livingroom_door_garage"
                        unCheckedChildren="livingroom_door_garage"
                        defaultChecked={status_dict["livingroom_door_garage"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="livingroom_door_out"
                        unCheckedChildren="livingroom_door_out"
                        defaultChecked={status_dict["livingroom_door_out"]}
                        onChange={onChange}
                      />
                    </Row>
                  </Col>
                </Space>
              </Card>
            </Col>
          </Row>

          <br />
        </Col>

        <Col span={15}>
          <img src={require("../../graphics/floorplan.png")} alt=""></img>
        </Col>

        <Col span={3}>
          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Master Bedroom" style={{ width: 250 }}>
                <Space>
                  <Col>
                    <Row>
                      <Switch
                        checkedChildren="master_bedroom_overhead_light"
                        unCheckedChildren="master_bedroom_overhead_light"
                        defaultChecked={
                          status_dict["master_bedroom_overhead_light"]
                        }
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="master_bedroom_window_1"
                        unCheckedChildren="master_bedroom_window_1"
                        defaultChecked={status_dict["master_bedroom_window_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="master_bedroom_window_2"
                        unCheckedChildren="master_bedroom_window_2"
                        defaultChecked={status_dict["master_bedroom_window_2"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="master_bedroom_lamp_1"
                        unCheckedChildren="master_bedroom_lamp_1"
                        defaultChecked={status_dict["master_bedroom_lamp_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="master_bedroom_lamp_2"
                        unCheckedChildren="master_bedroom_lamp_2"
                        defaultChecked={status_dict["master_bedroom_lamp_2"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="master_bedroom_television"
                        unCheckedChildren="master_bedroom_television"
                        defaultChecked={
                          status_dict["master_bedroom_television"]
                        }
                        onChange={onChange}
                      />
                    </Row>
                  </Col>
                </Space>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Bedroom Two" style={{ width: 250 }}>
                <Space>
                  <Col>
                    <Row>
                      <Switch
                        checkedChildren="bedroom_two_overhead_light"
                        unCheckedChildren="bedroom_two_overhead_light"
                        defaultChecked={
                          status_dict["bedroom_two_overhead_light"]
                        }
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bedroom_two_window_1"
                        unCheckedChildren="bedroom_two_window_1"
                        defaultChecked={status_dict["bedroom_two_window_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bedroom_two_window_2"
                        unCheckedChildren="bedroom_two_window_2"
                        defaultChecked={status_dict["bedroom_two_window_2"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bedroom_two_lamp_1"
                        unCheckedChildren="bedroom_two_lamp_1"
                        defaultChecked={status_dict["bedroom_two_lamp_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bedroom_two_lamp_2"
                        unCheckedChildren="bedroom_two_lamp_2"
                        defaultChecked={status_dict["bedroom_two_lamp_2"]}
                        onChange={onChange}
                      />
                    </Row>
                  </Col>
                </Space>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Bedroom Three" style={{ width: 250 }}>
                <Space>
                  <Col>
                    <Row>
                      <Switch
                        checkedChildren="bedroom_three_overhead_light"
                        unCheckedChildren="bedroom_three_overhead_light"
                        defaultChecked={
                          status_dict["bedroom_three_overhead_light"]
                        }
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bedroom_three_window_1"
                        unCheckedChildren="bedroom_three_window_1"
                        defaultChecked={status_dict["bedroom_three_window_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bedroom_three_window_2"
                        unCheckedChildren="bedroom_three_window_2"
                        defaultChecked={status_dict["bedroom_three_window_2"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bedroom_three_lamp_1"
                        unCheckedChildren="bedroom_three_lamp_1"
                        defaultChecked={status_dict["bedroom_three_lamp_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bedroom_three_lamp_2"
                        unCheckedChildren="bedroom_three_lamp_2"
                        defaultChecked={status_dict["bedroom_three_lamp_2"]}
                        onChange={onChange}
                      />
                    </Row>
                  </Col>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={3}>
          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Master Bathroom" style={{ width: 250 }}>
                <Space>
                  <Col>
                    <Row>
                      <Switch
                        checkedChildren="master_bath_overhead_light"
                        unCheckedChildren="master_bath_overhead_light"
                        defaultChecked={
                          status_dict["master_bath_overhead_light"]
                        }
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="master_bath_window_1"
                        unCheckedChildren="master_bath_window_1"
                        defaultChecked={status_dict["master_bath_window_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="master_bath_exhaust_fan"
                        unCheckedChildren="master_bath_exhaust_fan"
                        defaultChecked={status_dict["master_bath_exhaust_fan"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="master_bath_water"
                        unCheckedChildren="master_bath_water"
                        defaultChecked={status_dict["master_bath_water"]}
                        onChange={onChange}
                      />
                    </Row>
                  </Col>
                </Space>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Bathroom Two" style={{ width: 250 }}>
                <Space>
                  <Col>
                    <Row>
                      <Switch
                        checkedChildren="bath_two_overhead_light"
                        unCheckedChildren="bath_two_overhead_light"
                        defaultChecked={status_dict["bath_two_overhead_light"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bath_two_window_1"
                        unCheckedChildren="bath_two_window_1"
                        defaultChecked={status_dict["bath_two_window_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bath_two_exhaust_fan"
                        unCheckedChildren="bath_two_exhaust_fan"
                        defaultChecked={status_dict["bath_two_exhaust_fan"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="bath_two_water"
                        unCheckedChildren="bath_two_water"
                        defaultChecked={status_dict["bath_two_water"]}
                        onChange={onChange}
                      />
                    </Row>
                  </Col>
                </Space>
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Laundry Room" style={{ width: 250 }}>
                <Space>
                  <Col>
                    <Row>
                      <Switch
                        checkedChildren="laundry_overhead_light"
                        unCheckedChildren="laundry_overhead_light"
                        defaultChecked={status_dict["laundry_overhead_light"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="laundry_clothes_washer"
                        unCheckedChildren="laundry_clothes_washer"
                        defaultChecked={status_dict["laundry_clothes_washer"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="laundry_clothes_dryer"
                        unCheckedChildren="laundry_clothes_dryer"
                        defaultChecked={status_dict["laundry_clothes_dryer"]}
                        onChange={onChange}
                      />
                    </Row>
                  </Col>
                </Space>
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Garage" style={{ width: 250 }}>
                <Space>
                  <Col>
                    <Row>
                      <Switch
                        checkedChildren="garage_door_1"
                        unCheckedChildren="garage_door_1"
                        defaultChecked={status_dict["garage_door_1"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="garage_door_2"
                        unCheckedChildren="garage_door_2"
                        defaultChecked={status_dict["garage_door_2"]}
                        onChange={onChange}
                      />
                      <Switch
                        checkedChildren="garage_water"
                        unCheckedChildren="garage_water"
                        defaultChecked={status_dict["garage_water"]}
                        onChange={onChange}
                      />
                    </Row>
                  </Col>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <TextArea bordered={false} value={words[Math.round(Math.random())]} />
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
};

export { ScreenOne };
