import { ApiEndpoints, CallProtectedApi } from '../common/Api';

export class Customer {
  map(arg0: (item: Customer) => import("react").JSX.Element): import("react").ReactNode {
    throw new Error('Method not implemented.');
  }
    id: string = ' ';

    name: string = ' ';

    address: string = ' ';

    city: string = ' ';

    country: string = '';

    contactinfo: string = ' ';
 


static GetCustomerList(onSuccess: (res: Customer[]) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.customer.getList,
                method: 'GET',
                onsuccess(res:any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err) {
                        onFail(err);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static CreateCustomer(objCustomer: Customer, onSuccess: (res: Customer) => void, onFail: (err: string) => void) {
        try {
            debugger;
            CallProtectedApi({
                endpoint: ApiEndpoints.customer.create,
                method: 'POST',
                body: objCustomer,
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err) {
                        onFail(err);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }
    static UpdateCustomer(objCustomer: Customer, onSuccess: (res: Customer) => void, onFail: (err: string) => void) {
        try {
            debugger;
            CallProtectedApi({
                endpoint: ApiEndpoints.customer.update(objCustomer.id),
                method: 'PUT',
                body: objCustomer,
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any){
                    if (err) {
                        onFail(err);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static PatchUpdateCustomer(objCustomer: Customer, onSuccess: (res: Customer) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.customer.patchUpdate(objCustomer.id),
                method: 'PATCH',
                body: objCustomer,
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err) {
                        onFail(err);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static GetCustomer(id: string, onSuccess: (res: Customer) => void, onFail: (err: string) => void) {
        try {
            CallProtectedApi({
                endpoint: ApiEndpoints.customer.getCustomer(id),
                method: 'GET',
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err) {
                        onFail(err);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

    static DeleteCustomer(id: string, onSuccess: (res: any) => void, onFail: (err: string) => void) {
        try {
            debugger;
            CallProtectedApi({
                endpoint: ApiEndpoints.customer.deleteCustomer(id),
                method: 'DELETE',
                onsuccess(res: any) {
                    onSuccess(res);
                },
                onFail(err:any) {
                    if (err) {
                        onFail(err);
                    }
                },
            });
        } catch (error: any) {
            onFail(error.message);
        }
    }

}
