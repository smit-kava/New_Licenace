import { ApiEndpoints, CallProtectedApi } from '../common/Api';

export class License {
    licenseid: string = '';

    customerid: string = '';

    type: number = 0;

    displayname: string = '';

    licensedays: number = 0;

    maxactivation: number = 0;

    status: number = 0;

    activatedon: string = '';

    expirydate: string = '';

    static GetLicenseList(onSuccess: (res: License[]) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.license.getList,
                method: 'GET',
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error:String | any) {
            onFail(error.message);
        }
    }

    static CreateLicense(objLicense: License, onSuccess: (res: License) => void, onFail: (err: string) => void) {
        try {
            debugger;
            CallProtectedApi({
                endpoint: ApiEndpoints.license.create,
                method: 'POST',
                body: objLicense,
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static getCustomerLicenseList(customerID: string, onSuccess: (res: License[]) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.license.getCustomerLicense(customerID),
                method: 'GET',
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static updateLicense(objLicense: License, onSuccess: (res: License) => void, onFail: (err: string) => void) {
        debugger
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.license.updateLicense(objLicense.licenseid),
                method: 'PUT',
                body: objLicense,
                onsuccess(res: any){
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static patchUpdateLicense(objLicense: License, onSuccess: (res: License) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.license.patchUpdateLicense(objLicense.licenseid),
                method: 'PATCH',
                body: objLicense,
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static deleteLicense(licenseID: string, onSuccess: (res: any) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.license.deleteLicense(licenseID),
                method: 'DELETE',
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static GetCustomerLicense(licenseID: string, customerID: string, onSuccess: (res: License) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.license.getCustomerLicense(licenseID),
                method: 'GET',
                onsuccess(res: any) {

                    if (res.length > 0) {

                        onSuccess(res[0]);
                    } else {
                        onFail('No License found');
                    }
                },
                onFail(err:any) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static updateCustomerLicense(objLicense: License, onSuccess: (res: License) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.license.updateCustomerLicense(objLicense.licenseid, objLicense.customerid),
                method: 'PUT',
                body: objLicense,
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static patchUpdateCustomerLicense(objLicense: License, onSuccess: (res: License) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.license.patchUpdateCustomerLicense(objLicense.licenseid, objLicense.customerid),
                method: 'PATCH',
                body: objLicense,
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static deleteCustomerLicense(licenseID: string, customerID: string, onSuccess: (res: any) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.license.deleteCustomerLicense(licenseID, customerID),
                method: 'DELETE',
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err) {
                    if (err.detail) {
                        onFail(err.detail);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

}
