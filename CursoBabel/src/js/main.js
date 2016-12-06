Vue.use(VueRouter);

let router = new VueRouter();

router.map({
    '/':{
      name: 'dashboard',
      component: billDashboardComponent,
    },
    '/bill-pays':{
        component: billPayComponent,
        subRoutes:{
            '/payList':{
               name: 'bill-pay.list',
               component: billPayListComponent
            },
             '/payCreate':{
             name:'bill-pay.create',
             component: billPayCreateComponent
             },
             '/:id/update':{
             name:'bill-pay.update',
             component: billPayCreateComponent
             },

        }
    },
    '/bill-receives': {
        component: billReceiveComponent,
        subRoutes: {
            '/receiveList': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
                '/receiveCreate':{
                    name:'bill-receive.create',
                    component: billReceiveCreateComponent
                },
                '/:index/update':{
                    name:'bill-receive.update',
                    component: billReceiveCreateComponent
                },
            }

    }

});

router.start({
    components:{
        'bill-component': billComponent
    }
}, '#app');

router.redirect({
    '*':'/'
});






