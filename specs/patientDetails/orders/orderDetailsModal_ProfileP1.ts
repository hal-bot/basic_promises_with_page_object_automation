
import {OrderDetailsModal} from "../../../objects/pages/patientDetails/orders/orderDetailsModal_general";
import {OrdersTab} from "../../../objects/pages/patientDetails/orders/tabOrders";
/**
 *  Description: This will test P1 tests for the contents of the Order Details modal which is opened from the Patient Details page's Orders PageTab
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-77
 */


fdescribe('The Order Details modal\'s "Profile Information" tab (from the Patient\'s Details page) P1 level tests', () => {

    let orderModal: OrderDetailsModal;  // the modal that opens by clicking a Visit No in the "Visits" tab

    beforeAll(() => {
        return OrdersTab.UniversalOpenOrdersModal().then(async (modal)=> {
            orderModal = modal;
            return orderModal.initialize();
        });
    });

    afterAll( ()=> {
        return orderModal.closeModal();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/= **/
    it('should be present', () => {
        console.log("The 'Visit Details' modal should be present");
        expect<any>(orderModal.isPresent()).toBe(true);
    });

});
