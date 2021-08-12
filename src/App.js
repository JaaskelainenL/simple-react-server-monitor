import React from 'react';
import './App.css';

// Connect to IP address given
const connectToIp = async(ip) =>{
  const response = await fetch(ip);
  return response.json();
}

// Houses all the data

class App extends React.Component {

  constructor(props) {
    super(props);
    this.connect = this.connect.bind(this);
    this.showData = this.showData.bind(this);
    this.state = {
      ip: "http://localhost:8000", // For testing purposes :)
      data: {},
    }
  }

  async componentDidMount() {
    if(this.state.ip !== ""){
      this.connect();
    }

    setInterval(this.connect, 5000); // Refresh data every 5 seconds
  }

  showData(){
    if(this.state.data.info !== undefined){


      // Visual effects on the text.
      // Changes color depending on the heat
      var cpuText = "cpu";
    
      if(this.state.data.cpuTemp > 75)
        cpuText+="hot";
      else if(this.state.data.cpuTemp > 45)
        cpuText+="med";

      var ramText = (this.state.data.memUsed/1073741824).toFixed(2) + "GiB / " + (this.state.data.memTotal/1073741824).toFixed(2)+"GiB"; // change to bytes to GiB 

      return(
        <div>
        <h1>{this.state.data.info}</h1>
        <h2 id="cputext">CPU Temperature:</h2>
        <h1 id={cpuText}>{this.state.data.cpuTemp}°C</h1>
        <h2>Ram Usage:</h2>
        <h1 id="medText">{ramText}</h1> 
        <h2>Uptime:</h2>
        <h1 id="bigText">{(this.state.data.uptime/3600).toFixed(1)}h</h1>
        </div>

      );
    }
  }

  // Sends the user input to the connection function
  async connect(){
    
    // (Add http if not present in link)
    var h = "";

    if(!((this.state.ip.startsWith("http://")) || (this.state.ip.startsWith("https://")))){
        h = "http://";

    } 
      const c = await connectToIp(h+this.state.ip);
      this.setState({data: c})

  }

  render() {
    return (
      <div>
        <center>
        <h1>IP address</h1>
        <input type="text" placeholder="Enter IP Address here" onChange={e => this.setState({ip: e.target.value})}/>
        <button onClick={this.connect}>Connect!</button>

        {this.showData()}

        </center>
      </div>
    )
  }
}

export default App;
