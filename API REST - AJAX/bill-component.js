window.billComponent ={
    template: `
    <nav class="navbar navbar-default">
     <div class="container-fluid collapse navbar-collapse">
        <div class="navbar-header"  v-for="o in menus">
            <ul class="nav nav-tabs navbar-nav">
                <a class="navbar-brand" v-link="{name: o.routeName}">{{ o.name }}</a>
            </ul>
        </div>
     </div>
    </nav>
    <router-view></router-view>
`,
    data: function () {
        return {
            menus: [
                {name: "Home", routeName: 'dashboard'},
                {name: "Contas a Pagar", routeName: 'bill-pay.list'},
                {name: "Contas a Receber", routeName: 'bill-receive.list'}
            ],
        }
    },

};
