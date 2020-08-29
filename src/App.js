import React, { useState, useEffect } from 'react';
import './App.css';
// eslint-disable-next-line
import { toppingHistory } from './data.js';

const useFetch = (url) => {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      fetch(url, {
        mode: 'no-cors'
      }).then(function(response) {
          console.log(response);
          return response;
      }).then(function(j) {
          setData(j);
          // `j` is a JavaScript object
          //console.log(JSON.stringify(j));
      }).catch(function(error) {
          console.log('Request failed', error)
      });
    }

    fetchData();
    // eslint-disable-next-line
  }, [url]);

  return data;
};

const formatGetData = (data) => {
  let toppingCounts = {};
  let stringCombination;
  let sortedToppingCounts = [];
  let sortedTopCombos = [];
  
  data.forEach(toppingObj => {
    stringCombination = "";

    // Won't sort, assuming that the array of toppings are always ordered
    toppingObj.toppings.forEach(item => {
      if(stringCombination.length === 0)
        stringCombination += item;
      else
        stringCombination += `/${item}`;
    })

    if(stringCombination in toppingCounts)
      toppingCounts[stringCombination] += 1;
    else
      toppingCounts[stringCombination] = 1;
  });

  // Turns array of objects into an array of arrays
  for (var toppingCount in toppingCounts) {
      sortedToppingCounts.push([toppingCount, toppingCounts[toppingCount]]);
  }
  // Sorts array and pulls top 20
  sortedTopCombos = sortedToppingCounts.sort((a, b) => b[1] - a[1]).splice(0, 20);

  return sortedTopCombos;
}

const App = () => {
    const URL = 'https://www.olo.com/pizzas.json';
    // Because the server wasn't giving me the data
    //response type equaled opaque
    //even with the no-cors
    // Went this route because didn't want to spend longer than an hour

    let result = useFetch(URL);
    // Over writes response from server with custom object similar to that of the response
    result = formatGetData(toppingHistory);

    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr>
              <th>Rank</th>
              <th/>
              <th>Topping Combinations</th>
              <th/>
              <th># Times Ordered</th>
            </tr>
            {result && result.length > 0 &&
            result.map((key, i) => {
              return (
              <tr key={i}>
                <td>{i+1}</td>
                <td/>
                <td>{key[0]}</td>
                <td/>
                <td>{key[1]}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
}

export default App;
