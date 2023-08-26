export interface Person {
  name?: string;
  birthYear?: string;
  eyeColor?: string;
  height?: number; // cm
  race?: string;
}

export interface Vehicle {
  name?: string;
  type?: string;
}

export interface StarWarsPostRequest {
  people: Person[];
  vehicles: Vehicle[];
  counterId: string;
}

export interface CounterRequest {
  counterId: string;
  counterOption: string;
}