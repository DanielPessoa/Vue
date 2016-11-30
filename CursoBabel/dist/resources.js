'use strict';

Vue.http.options.root = 'http://127.0.0.1:3000/api';

window.Bill = Vue.resource('bills{/id}', {}, {
    total: { method: 'GET', url: 'bills/total' }
});