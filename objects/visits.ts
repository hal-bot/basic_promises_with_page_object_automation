/***
 *
 * Make a class
 *
 * Needs:
 *      admissionDate: string (DATE??)
 *      type: string
 *      mrn: number
 *      serviceProvider: string
 *      accountNo: number ??
 *      location: string
 *
 *
 */

class Visit {
    admissionDate: string;  // (DATE??)
    type: string;
    mrn: number;
    serviceProvider: string;
    accountNumber: number; // ??
    location: string;

    constructor(visitType: string, mrn: number, provider: string, accountNumber: number, location: string) {
        this.admissionDate = 'today';  //TODO: make this a date
        this.type = visitType;
        this.mrn = mrn;
        this.serviceProvider = provider;
        this.accountNumber = accountNumber;
        this.location = location;
    };

}