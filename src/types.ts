export interface WeatherInformation{
    name: string;
    temperature: number;
    temperatureMin:number;
    temperatureMax:number;
    humidity: number;
    wind: number;
    date:Date;
    errorOccured:boolean;
    description:string;

  }
