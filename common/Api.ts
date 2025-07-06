import { Api, HttpMethod, ProtectedApi } from '../Service/axios';


export const ApiEndpoints = {
    login: 'login/',
    logout: 'logout/',
    customer: {
        getList: 'customer/',
        create: 'customer/',
        update: (id: string) => 'customer/' + id + '/',
        getCustomer: (id: string) => 'customer/' + id,
        deleteCustomer: (id: string) => 'customer/' + id + '/',
        patchUpdate: (id: string) => 'customer/' + id,
    },
    license: {
        getList: 'license/',
        create: 'license/',
        getLicense: (licenseID: string) => 'license/' + licenseID + '/',
        updateLicense: (licenseID: string) => 'license/' + licenseID + '/',
        patchUpdateLicense: (licenseID: string) => 'license/' + licenseID + '/',
        deleteLicense: (licenseID: string) => 'license/' + licenseID + '/',
        getCustomerLicense: (customerID: string) => 'license/' + customerID + '/' ,
        updateCustomerLicense: (licenseID: string, customerID: string) => 'license/' + licenseID + '/' + customerID + '/',
        patchUpdateCustomerLicense: (licenseID: string, customerID: string) => 'license/' + licenseID + '/' + customerID + '/',
        deleteCustomerLicense: (licenseID: string, customerID: string) => 'license/' + licenseID + '/' + customerID + '/',
    },
    activation: {
        getActivationList: 'activation-history/',
        create: 'activation-history/',
        getSingleActivation: (licenseID: string, customerID: string) => 'activation-history/' + licenseID + '/' + customerID,
        updateActivation: (licenseID: string, customerID: string) => 'activation-history/' + licenseID + '/' + customerID,
        patchUpdateActivation: (licenseID: string, customerID: string) => 'activation-history/' + licenseID + '/' + customerID,
        deleteActivation: (licenseID: string, customerID: string) => 'activation-history/' + licenseID + '/' + customerID,
        registerActivation: 'activation-history/register',
    },
};

interface ICallApi<T> {
    endpoint: string;
    method: HttpMethod;
    body?: any;
    onsuccess: (res: T) => void;
    onFail: (err: any) => void;
}


export async function CallApi<T>({ endpoint, method, body, onsuccess, onFail }: ICallApi<T>) {
    try {
        const data = await Api.request<T>(method, endpoint, body);
        onsuccess(data);
    } catch (error: any) {
        onFail(error.message);
    }
}


export async function CallProtectedApi<T>({ endpoint, method, body, onsuccess, onFail }: ICallApi<T>) {
    try {
        const data = await ProtectedApi.request<T>(method, endpoint, body);
        onsuccess(data);
    } catch (error:any) {
        onFail(error.message);
    }
}

