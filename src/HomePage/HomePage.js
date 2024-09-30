// import React from 'react'

// function HomePage() {
//   return (
//     <div>
      
//     <main className="center" id="main">
//       <div className="page-area">
//         <article>
//           <h1>Stay on track</h1>
//           <p>
//             Do you know where you are spending your money? If you really stop to
//             track it down, you would get surprised! Proper budget management
//             depends on real data... and this app will help you with that!
//           </p>
//         </article>

//         <article>
//           <h1>Alerts</h1>
//           <p>
//             What if your clothing budget ended? You will get an alert. The goal
//             is to never go over the budget.
//           </p>
//         </article>

//         <article>
//           <h1>Results</h1>
//           <p>
//             People who stick to a financial plan, budgeting every expense, get
//             out of debt faster! Also, they to live happier lives... since they
//             expend without guilt or fear... because they know it is all good and
//             accounted for.
//           </p>
//         </article>

//         <article>
//           <h1>Free</h1>
//           <p role="status">
        
//             This app is free!!! And you are the only one holding your data!
//           </p>
//         </article>

//         <article>
//           <h1>Stay on track</h1>
//           <p>
//             Do you know where you are spending your money? If you really stop to
//             track it down, you would get surprised! Proper budget management
//             depends on real data... and this app will help you with that!
//           </p>
//         </article>

//         <article>
//           <h1>Alerts</h1>
//           <p>
//             What if your clothing budget ended? You will get an alert. The goal
//             is to never go over the budget.
//           </p>
//         </article>

//         <article>
//           <h1>Results</h1>
//           <p>
//             People who stick to a financial plan, budgeting every expense, get
//             out of debt faster! Also, they to live happier lives... since they
//             expend without guilt or fear... because they know it is all good and
//             accounted for.
//           </p>
//         </article>

        
//       </div>
//       <div class="page-area-charts">
//         <article>
//           <h1>Chart</h1>
//           <p>
//             <canvas id="myChart" width="400" height="400"></canvas>
//           </p>
//         </article>

//         <article>
//           <h1>D3JS Donut Chart © Aishwarya </h1>
//           <p>
//           <div id="D3donutchart"></div>
//           </p>
//       </article>
//       </div>
//     </main>
//     </div>
//   )
// }

// export default HomePage

import React, { useEffect, useRef } from 'react';
import { axiosGet , AxiosService} from '../AxiosService';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

function HomePage() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
              try {
                const response = await axiosGet('/budget');

                if (response && response.data && response.data.myBudget) {
                    const myBudgetData = response.data.myBudget;

                    const labels = myBudgetData.map((item) => item.title);
                    const data = myBudgetData.map((item) => item.budget);

                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy();
                    }

                    const chartContext = chartRef.current.getContext('2d');
                    const newChartInstance = new Chart(chartContext, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    data: data,
                                    backgroundColor: [
                                        'pink',
                                        'green',
                                        'red',
                                        'orange',
                                        'yellow',
                                        'violet',
                                        'blue',
                                    ],
                                },
                            ],
                        },
                    });

                    chartInstanceRef.current = newChartInstance;

                    drawD3DonutChart(myBudgetData);

                }
            } catch (error) {
                console.error('Fetching data error', error);
            }
        };

        fetchData();
    }, []);


    return (
        <main className="center" id="main">

            <div className="page-area">

                <article>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>

                <article>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>

                <article>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear...
                        because they know it is all good and accounted for.
                    </p>
                </article>

                <article>
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </article>

                <article>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>

                <article>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>

                <article>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear...
                        because they know it is all good and accounted for.
                    </p>
                </article>

                <article>
                    <h1>Chart.js</h1>
                    <p>
                        <canvas id="myChart" width="500" height="500" ref={chartRef}></canvas>
                    </p>
                </article>

                <article>
                    <h1>D3 Chart</h1>
                    <div id="myD3Chart"></div>
                </article>
            </div>

        </main>
    );
}

function drawD3DonutChart(data) {
    const width = 700;
    const height = 700;
    const radius = (Math.min(width, height) / 3);

    const existingChart = d3.select('#myD3Chart svg');
    if (!existingChart.empty()) {

        return;
    }

    const svg = d3.select('#myD3Chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.title))
        .range(['fd6b19', '#36a2eb', '#ff6384', '#ffcd56']);

    const pie = d3.pie()
        .value(d => d.budget);

    const arc = d3.arc()
        .outerRadius(radius - 20)
        .innerRadius(radius - 60);

    const outerArc = d3.arc()
        .outerRadius(radius - 30)
        .innerRadius(radius - 30);

    const arcs = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.title));

    const labelLines = arcs.append('line')
        .attr('x1', d => outerArc.centroid(d)[0])
        .attr('y1', d => outerArc.centroid(d)[1])
        .attr('x2', d => {
            const pos = outerArc.centroid(d);
            const midAngle = Math.atan2(pos[1], pos[0]);
            return Math.cos(midAngle) * (radius + 10);
        })
        .attr('y2', d => {
            const pos = outerArc.centroid(d);
            const midAngle = Math.atan2(pos[1], pos[0]);
            return Math.sin(midAngle) * (radius + 10);
        })
        .attr('stroke', 'green');

    arcs.append('text')
        .attr('transform', d => {
            const pos = outerArc.centroid(d);
            const midAngle = Math.atan2(pos[1], pos[0]);
            return `translate(${Math.cos(midAngle) * (radius + 20)},${Math.sin(midAngle) * (radius + 20)})`;
        })
        .attr('dy', '0.75em')
        .style('text-anchor', d => {
            const pos = outerArc.centroid(d);
            return (Math.cos(Math.atan2(pos[1], pos[0])) > 0) ? 'start' : 'end';
        })
        .text(d => `${d.data.title} (${d.data.budget})`);
}

export default HomePage;
