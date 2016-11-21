var appComponent = Vue.extend({
    template: `
    <div id="app">
        <h1>{{ title }} </h1>
        <h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">{{ status | statusGeneral }}</h3>
        <nav>
            <ul v-for="o in menus">
                <li><a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a></li>
            </ul>
        </nav>
        <div v-if="activedView == 0 ">
            <table class="table table-condensed table-hover">
                <thead>
                    <tr>
                        <th>Vencimento</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Paga?</th>
                        <th>Ações</th>
                        <th>Pagar Conta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="o in bills">
                        <td>{{ o.date_due }}</td>
                        <td>{{ o.name }}</td>
                        <td>{{ o.value | currency 'R$ ' }}</td>
                        <td class="minha-classe" :class="{'pago' : o.done, 'nao-pago': !o.done}">
                            {{ o.done | doneLabel }}
                        </td>
                        <td>
                            <a href="#" @click.prevent="loadBill(o)">Editar</a> |
                            <a href="#" @click.prevent="deleteBill(o)">Apagar</a>
                        </td>
                        <td>
                            <button class="btn btn-success"> <a  @click.prevent="pagarConta(o)">Conta Paga</a></button>
                            <button class="btn btn-danger"><a @click.prevent="contaNaoPaga(o)">Conta Não Paga</a></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="activedView == 1">
            <form v-on:submit.prevent="submit">
                <div class="form-group">
                    <label>Vencimento</label>
                    <input v-model="bill.date_due" class="form-control">
                </div>
                <div class="form-group">
                    <label>Nome:</label>
                    <select v-model="bill.name">
                        <option v-for="o in names" :value="o">{{ o }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Valor</label>
                    <input v-model="bill.value" class="form-control">
                </div>
    
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
`,
    data: function(){
        return {
            test: '',
            title: 'Contas a pagar',
            menus: [
                {id: 0, name: "Listar contas"},
                {id: 1, name: "Criar Contas"}
            ],
            activedView: 1,
            formType: 'insert',
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0,
            },
            names: [
                'Conta de Luz',
                'Conta de água',
                'Conta de Telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ],
            bills: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 70.99, done: 1},
                {date_due: '21/08/2016', name: 'Conta de água', value: 50.99, done: 1},
                {date_due: '22/08/2016', name: 'Conta de Telefone', value: 55.99, done: 0},
                {date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: 0},
                {date_due: '24/08/2016', name: 'Cartão de Crédito', value: 1500.99, done: 0},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: 0},
                {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: 0},
            ]
        }
    },
    computed: {
        status: function () {
            if (!this.bills.length > 0) {
                return false;
            }
            var count = 0;
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }

            return count;
        }
    },
    methods:{
        showView: function (id) {
            this.activedView = id;
            if(id ==1 ){
                this.formType = 'insert';
            }
        },
        submit: function () {
            if(this.formType == 'insert') {
                this.bills.push(this.bill);
            }
            // bill da listagem do bill do formulário
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: bollean,
            };
            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function (bill) {
            var confirma = confirm("Deseja deletar essa conta?");
            if(confirma) {
                var index = this.bills.indexOf(bill);
                this.bills.splice(index, 1);
            }
        },
        pagarConta: function (bill) {
            this.bill = bill;
            this.bill.done = 1;

        },
        contaNaoPaga: function (bill) {
            this.bill = bill;
            this.bill.done = 0;

        }
    }
});
var app = new Vue({
    el: '#app',

});

Vue.component('app-component', appComponent);

Vue.filter('doneLabel', function (value) {
    if(value == 0){
        return "Não paga"
    }else{
       return "Paga"
    }

})

Vue.filter('statusGeneral', function (value) {
        if(value === false){
            return "Nenhuma Conta Cadastrada"
        }
        if (!value){
            return "Nenhuma conta a Pagar";
        }else{
            return "Existem: "+ value + " contas a serem pagas";
        }

})





