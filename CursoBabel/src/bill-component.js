window.billComponent ={
    template: `
<div class="navbar-fixed">
    <nav>
        <div class="nav-wrapper container">
            <a href="#" class="right brand-logo">Conde Contas</a>
            <a href="#" data-activates="nav-mobile" class="button-collapse">
                <i class="material-icons">menu</i>
            </a>
            <ul class="left hide-on-med-and-down">
                   <li  v-for="o in menus">
                     <a v-link="{name: o.routeName}">{{ o.name }}</a>
                   </li>
            </ul>
           <ul id="nav-mobile" class="side-nav">
             <li  v-for="o in menus">
                <a v-link="{name: o.routeName}">{{ o.name }}</a>
              </li>
           </ul>
        </div>
    </nav>
</div>   
    <router-view></router-view>

    
`,
    created(){
        $(document).ready(function () {
            $('.button-collapse').sideNav();
        });
    },
    data: function () {
        return {
            menus: [
                {name: "Home", routeName: 'dashboard'},
                {name: "Contas a Receber", routeName: 'bill-receive.list'},
                {name: "Contas a Pagar", routeName: 'bill-pay.list'},

            ],
        }
    },

};

