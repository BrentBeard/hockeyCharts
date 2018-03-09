import React from 'react';
import ReactDOM from 'react-dom';
import {Bar, Line, Polar} from 'react-chartjs-2'

  var config = {
    apiKey: "AIzaSyA6V4xMtMdyggupeIh7SQAk7kSJRdSHvy8",
  authDomain: "hockey-charts-test.firebaseapp.com",
  databaseURL: "https://hockey-charts-test.firebaseio.com",
  projectId: "hockey-charts-test",
  storageBucket: "hockey-charts-test.appspot.com",
  messagingSenderId: "439369478234"
};
firebase.initializeApp(config);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      goals: '',
      assists: '' ,
      primaryPts:'' ,
      hdC60: '',
      s60: '',
      bar: '' 
    }
    this.switchStats = this.switchStats.bind(this)
    
  }
  
  // static defaultProps = {
  //   displayTitle: true,
  //   displayLegend: false
  // }
  componentDidMount() {
    const dbRef = firebase.database().ref()
    dbRef.on('value', (snapshot)=>{
      const data = snapshot.val();
      console.log(data[0].bozak)
    })
    this.setState({
      chartData: {
        labels: [`Goals`, `Assists`, `PrimaryPts`, `HDChances/60`, `Shots/60`],
        datasets: [
          {
            data: [this.state.goals, this.state.assists, this.state.primaryPts, this.state.hdC60, this.state.s60],
            backgroundColor: ['blue', 'orange', 'dodgerblue', 'darkcyan', 'firebrick']
          }
        ],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      },
      
    })
  }

  switchStats(e) {
    const dbRef = firebase.database().ref()
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const player = e.target.value
      // let goals = data[0].player
      // let goals = data[0].e.target.value
      console.log(player)
      console.log(data[0][player])
      console.log(data[0])
      const goals = data[0][player]
      const assists = data[1][player]
      const primaryPts = data[2][player]
      const hdC60 = data[3][player]
      const s60 = data[4][player]
      
      
      
      this.setState({
        chartData: {
          labels: [`Goals`, `Assists`, `PrimaryPts`, `HDChances/60`, `Shots/60`],
          datasets: [
            {
              data: [this.state.goals, this.state.assists, this.state.primaryPts, this.state.hdC60, this.state.s60],
              backgroundColor: ['blue', 'orange', 'dodgerblue', 'darkcyan', 'firebrick']
            }
          ],
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        },
        goals: goals,
        assists: assists,
        primaryPts: primaryPts,
        hdC60: hdC60,
        s60: s60
      })
      console.log(this.state.goals)
    })

  }

    render() {
      return (

        <React.Fragment>
          <div>
          <Bar data={this.state.chartData} options={{
            title: {
              display: true,
              text: 'Even Strength Skater Stats'
              },
              legend: {
                display: false
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      max: 40
                    }
                  }
                ]
              }
            }} />
          </div>
          <button value='matthews' onClick={this.switchStats}>Matthews</button>
          <button value='nylander' onClick={this.switchStats}>Nylander</button>
          <button value='hyman' onClick={this.switchStats}>Hyman</button>
          <button value='kadri' onClick={this.switchStats}>Kadri</button>
          <button value='marner' onClick={this.switchStats}>Marner</button>
          <button value='marleau' onClick={this.switchStats}>Marleau</button>
          <button value='bozak' onClick={this.switchStats}>Bozak</button>
          <button value='jvr' onClick={this.switchStats}>JVR</button>
          <button value='brown' onClick={this.switchStats}>Brown</button>
          <button value='komarov' onClick={this.switchStats}>Komarov</button>
        </React.Fragment>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           callback: function (label, index, labels) {
//             return '$' + label;
//           }
//         }
//       }
//     ]
//   },

// }

