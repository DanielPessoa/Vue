window.billPayMenuComponent ={
    template: `
    <nav>
        <ul v-for="o in menus">
            <li><a v-link="{name: o.routeName}">{{ o.name }}</a></li>
        </ul>
    </nav>
`,
    data: function () {
        return {
            menus: [
                // {id: 0, name: "Listar contas", url: '/bills'},
                // {id: 1, name: "Criar Contas", url: '/bill/create'}
                {id: 0, name: "Listar contas", routeName: 'bill-pay.list'},
                {id: 1, name: "Criar Contas", routeName: 'bill-pay.create'}
            ],
        }
    },

};
