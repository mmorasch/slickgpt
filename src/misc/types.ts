export interface IDatapoint {
  id: string;
  expert_opinion: string;
  threshold: string;
  prediction: string;
  [key: string]: any
}

export interface IPrediction {
  result: string;
}

export interface IThreshold {
  threshold: string
}