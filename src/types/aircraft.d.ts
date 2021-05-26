interface IAircraft {
    id: string;
    ident: string;
    type: string;
    economySeats: number;
    base: string;
    assignedFlights?: IFlight[];
    utization: number;
}

