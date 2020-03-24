import BaseSubFormRequest from '@utils/request/BaseSubFormRequest';

class Request extends BaseSubFormRequest {
    constructor(props) {
        super(props);
    }

    static login(params) {
        return this.post('/user/login', params);
    }
}

export default Request;
