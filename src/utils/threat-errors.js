import {browserHistory} from "react-router";
import {clearUserStore} from "./user-information-store";
import {publishMessage} from "./messages-publisher";
import {expiredSessionError, opsInternalError} from "./strings";
import {INTERNAL_SERVER_ERROR, UNAUTHORIZED} from "./constants";

export const threatError = (error) => {
    const status = error.response.status;

    if(status) {
        if (status === UNAUTHORIZED) {
            publishMessage(expiredSessionError);

            clearUserStore();
            browserHistory.push('/');
        }
        else if(status === INTERNAL_SERVER_ERROR)
        {
            publishMessage(opsInternalError);
        }
    }
};