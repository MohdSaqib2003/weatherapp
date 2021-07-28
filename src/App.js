import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      temp : '',
      city : '',
      country : '',
      time_date : '',
      img  :'',
      text :'',
      input_city : 'New Delhi',
      time : '',
      date : '',
      day : '',
      humidity : '',
      wind : '',
      pressure : ''
    }
    document.title = "Weather App";
  }
  change_city=()=>{
    var city_name = document.getElementById('input').value;
    this.setState({
         input_city : city_name
    })
  }
  
  async forcast(){

    var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=762e9b045f8042f6b94112145211306&q=${this.state.input_city}&aqi=no`);
    console.log(response.ok);
    var err = document.querySelector('#error');
    err.style.visibility = "hidden";
    if(!(response.ok)){
    //  alert('Enter the valid city name');

    var err = document.querySelector('#error');
    err.style.visibility = "visible";
    var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=762e9b045f8042f6b94112145211306&q=${'New Delhi'}&aqi=no`);
   }
   var data = await response.json();
   var month = ["Jan","Fab","Mar","April","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
   var day = ['Night','Day'];
   var c_time =new Date(data.current.last_updated);
   var hh = c_time.getHours();
   var min = c_time.getMinutes();
   var ss = c_time.getSeconds();
   if(min===0){
     min = '00'
   }
   if(ss===0){
     ss = '00'
   }
   var dd = c_time.getDate();
   var mm = c_time.getMonth();
   var yy = c_time.getFullYear();
   var cntry='';

   if(data.location.country==='United States of America'){
      cntry ='USA';
   }else{
     cntry = data.location.country;
   }
   
   this.setState({
     temp : data.current.temp_c,
     city : data.location.name,
     time_date : hh+":"+min+' '+month[mm]+' '+dd+','+yy,
    //  time : data.current.last_updated,
     img : data.current.condition.icon,
     text : data.current.condition.text,
     country : '('+cntry+')',
     date : dd+"/"+Number(mm+1)+"/"+yy,
     time : (data.location.localtime).slice(10),
    //  time : hh+":"+min+":"+ss,
     day  : day[data.current.is_day],
     humidity : data.current.humidity,
     wind : data.current.wind_kph+" km/h",
     pressure : data.current.pressure_mb+" mb"
   })
  }
  // fun=()=>{
  //   var w  = window.innerWidth;
  //   console.log(w);
  //   this.setState({
  //     width  : w
  //   })
  // }

  componentDidMount(){
    this.forcast();
  }
  render() {
    return (
      <div>
        <div id="outer">

          <h1>Weather App</h1>
          
          <div id="get_city">
            <input type="text" id="input" placeholder="Enter city name" autoComplete='ON' onChange={this.change_city}/>
            <img src={process.env.PUBLIC_URL + "./search.png"} id="icon" onClick={this.forcast.bind(this)}/>
          </div>
            <div id='error' style={{visibility:'hidden'}}>Invalid city name</div>

          <div id="weather">
                <div id="info"> 
                   <span className="img"> <img src={this.state.img}/> </span> 
                   <span className="text">{this.state.text}</span><br/>
                   <span className="temp">{this.state.temp}&deg;C</span>
                   <span className="city">{this.state.city}</span>
                   <span className="country">{this.state.country}</span>  <br/>
                   <span className="time">As of {this.state.time_date}</span>

                </div>
          
                <div id="details"> 
                   <h3> Current </h3>
                      <table>
                        <tr>
                          <td>Date</td>
                          <td>{this.state.date}</td>
                        </tr>
                        <tr>
                          <td>Time</td>
                          <td>{this.state.time}</td>
                        </tr>
                        <tr>
                          <td>Day/Night</td>
                          <td>{this.state.day}</td>
                        </tr>
                      </table> <br/> <hr/> <br/>
                   <h3> Weather </h3>
                      <table>
                        <tr>
                          <td>Humidity</td>
                          <td>{this.state.humidity}</td>
                        </tr>
                        <tr>
                          <td>Wind</td>
                          <td>{this.state.wind}</td>
                        </tr>
                        <tr>
                          <td>Pressure</td>
                          <td>{this.state.pressure}</td>
                        </tr>
                      </table>
                </div>
                </div>
        </div>
      </div>
    );
  }
}

export default App;
