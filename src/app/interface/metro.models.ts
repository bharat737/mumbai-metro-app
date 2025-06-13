export interface Station {
  name: string;
  interval_from_previous: number;
  platforms: {
    to: {
      [destination: string]: number;
    };
  };
}

export interface Direction {
  from: string;
  to: string;
  start_time: string;
  end_time?: string;
  frequency_mins: {
    weekday: number;
    saturday: number;
    sunday: number;
    holiday: number;
  };
}

export interface MetroLine {
  name: string;
  line_name: string;
  status: 'AC' | 'AP' | 'UC' | 'PL';
  stations: Station[];
  directions?: Direction[];
}

export interface Interchange {
  station: string;
  lines: string[];
}