export interface IDeal {
    id?: string;
    propertyId: string;
    clientId: string;
    amount: number;
    interestRate: number;
    startDate: Date;
    endDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
  