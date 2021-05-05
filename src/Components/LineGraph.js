import React,{useEffect,useState} from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral'
import './LineGraph.css'

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };


  


function LineGraph({caseType}) {
    const [graphData,setGraphData] = useState({});

    const convertAsChartData = (data,caseType)=>{
        const chartData =[];
        let lastDateCases;
        //data = [cases,deaths,recovery] ans cases{date:caseValue}
        for(let date in data[caseType]){
            if(lastDateCases){
                const newDataPoint = {
                    x:date,
                    y:(data[caseType][date] - lastDateCases) < 0 ? 0 : data[caseType][date] - lastDateCases
                }
                chartData.push(newDataPoint);
            }
            lastDateCases=data[caseType][date];
        }
    
        return chartData;
    }


    useEffect(() => {
        const fetchData = async()=>{
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=220')
        .then(response => response.json())
        .then(data =>{
            const chartData=convertAsChartData(data,caseType);
            setGraphData(chartData);
        });
        }

        fetchData();
         
    }, [caseType])


    return (
        <div className="linegraph">
          <h3>Covid {caseType} graph</h3>
            {
                graphData?.length > 0 && (
                    <Line 
                        options={options}
                        data={
                            {
                                datasets:[
                                    {
                                        data:graphData,
                                        backgroundColor: [
                                            'rgba(200, 16, 55, 0.5)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 9, 132,1)',
                                            // 'rgba(254, 16, 235,1)',
                                        ],
                                        borderWidth: 1
                                    }
                                ]
                            }
            }/>
            )
            }
            
        </div>
    )
}

export default LineGraph;
