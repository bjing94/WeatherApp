import { WeatherInformation } from "../types";
export default class WeatherService {
  _apiKey: string = "6d7f2956ed528a6da4a0b8b400e8bf4b";

  handleErrors(response:any){
    if(!response.ok) throw new Error(response.status);
    return response;
  }

  _transformWeather(response: any): WeatherInformation {
    let currDate = new Date();
    let utc = currDate.getTime() - currDate.getTimezoneOffset() * 60000;
    let localDate = new Date(utc + response.timezone);

    let result: WeatherInformation = {
      name: response.name,
      temperature: Math.round((response.main.temp-273.15)*10)/10,
      temperatureMax:Math.round((response.main.temp_max-273.15)*10)/10,
      temperatureMin:Math.round((response.main.temp_min-273.15)*10)/10,
      wind: response.wind.speed,
      humidity: response.main.humidity,
      date: localDate,
      errorOccured:false,
      description:response.weather[0].description
    };
    return result;
  }
  async getWeather(cityName: string): Promise<WeatherInformation> {
    const result = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this._apiKey}`
    )
    .then((response)=>{
        if(response.status>=200 && response.status<=299){
            return response.json();
        }else{
           
            throw new Error(response.statusText)
        }

    }).then((jsonResponse)=>{
        return this._transformWeather(jsonResponse);
    }).catch((error)=>{
        const weatherNotFound: WeatherInformation = {
            name: `City ${cityName} doesn't exist`,
            temperature: 12,
            temperatureMax:12,
      temperatureMin:12,
            wind: 12,
            humidity: 12,
            date: new Date(),
            errorOccured:true,
            description:'Error'
          };
          return weatherNotFound;
    })
    ;
    return result;
  }
}
