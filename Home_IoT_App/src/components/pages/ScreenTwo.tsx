// Yarn
import React, { useContext } from "react";
import { CartesianGrid, Line, LineChart, Legend, XAxis, YAxis } from "recharts";


//creates line chart
const ScreenTwo = (props) => {
  //creates empty array to add historical data to
  const { dateData } = props;

  //add all utility total from prop object array
  let gallonsTotal = dateData.reduce((totalGallons, date) => totalGallons + date.gallons, 0);
  gallonsTotal = Math.round(gallonsTotal * 100) / 100;
  let kwhTotal = dateData.reduce((totalKwh, date) => totalKwh + date.kwh, 0);
  kwhTotal = Math.round(kwhTotal * 100) / 100;
  let costTotal = dateData.reduce((totalCost, date) => totalCost + date.cost, 0);
  costTotal = Math.round(costTotal * 100) / 100;

  //find total amount of collected data for current month
  const dateTotal = Object.keys(dateData).length;

  //find average utility per day
  const avgGallons = gallonsTotal / dateTotal;
  const avgKwh = kwhTotal / dateTotal;
  const avgCost = costTotal / dateTotal;

  //find current month and length of month
  let result = dateData.map(a => a.month);
  let date = new Date();
  const currentYear = date.getFullYear();
  function daysInCurrentMonth(){
    return new Date(currentYear, result[0], 0).getDate();
  };
  const days = daysInCurrentMonth();

  //find predicted values
  let predictionGallons = avgGallons * days;
  predictionGallons = Math.round(predictionGallons * 100) / 100;
  let predictionKwh = avgKwh * days;
  predictionKwh = Math.round(predictionKwh * 100) / 100;
  let predictionsCost = avgCost * days;
  predictionsCost = Math.round(predictionsCost * 100) / 100;

  return(
    <>
      <LineChart className="graph" width={500} height={300} data={dateData}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="gallons" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="cost" stroke="#82ca9d" dot={false} />
        <Line type="monotone" dataKey="kwh" stroke="#FF5733" dot={false} />
        <Line type="monotone" dataKey="volumef" strokeDasharray="5 5" stroke="red" dot={false} />
        <Legend />
      </LineChart>


      <div className="table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>water (gal)</th>
            <th> | </th>
            <th>electricity (kW)</th>
            <th> | </th>
            <th>total cost (USD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>predicted total</th>
            <td>{predictionGallons}</td>
            <th></th>
            <td>{predictionKwh}</td>
            <th></th>
            <td>{predictionsCost}</td>
          </tr>
          <tr>
            <th>actual total</th>
            <td>
              {gallonsTotal}
            </td>
            <th></th>
            <td>{kwhTotal}</td>
            <th></th>
            <td>{costTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  )
};

export { ScreenTwo };
// https://codesandbox.io/s/kec3v?file=/src/App.tsx:155-668
