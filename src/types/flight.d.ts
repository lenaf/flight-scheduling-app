interface IFlight {
    id: string;
    arrivaltime: number;
    departuretime: number;
    destination: string;
    origin: string;
    readable_arrival: string;
    readable_departure: string;
    aircraftId?: string | null;
}
