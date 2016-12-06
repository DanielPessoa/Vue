window.billDashboardComponent = {
    component: billComponent,
    template: `
    <style type="text/css">
       
        .green{
            color:green;
        }
        .red{
            color: red;
        }
        .gray{
            color: gray;
        }
        .minha-classe{
            background-color: burlywood;
        }
    </style>
    <h1>{{ title }} </h1>
    <h3 style="color: red" >Total de Contas a pagar: {{ pagamento | currency 'R$ '| 2 }}</h3>
    <h3 style="color: green">Total de Contas a Receber: {{ recebimento | currency 'R$ '| 2 }}</h3>
    <h3 style="color: blue">Total do caixa: {{  total | currency ' R$ '| 2 }}</h3>
    
    <router-view></router-view>
    
    `,
    data: function(){
        return {
            title: 'DashBoard',
            activedView: 0,
            totalPay: 0,
            totalReceive: 0,
        };
    },
    computed: {
        pagamento: function () {

            var bills = this.$root.$children[0].billsPay;

            var pag = 0;

            for (var i in bills) {
                pag += bills[i].value;
            }
                return pag;
        },
        recebimento: function () {

            var bills = this.$root.$children[0].billsReceive;

            var receb = 0;

            for (var i in bills) {
                receb += bills[i].value;
            }
            return receb;
        },

        total: function (pag, receb ) {

            var bills = this.$root.$children[0].billsPay;

            var pag = 0;

            for (var i in bills) {
                pag += bills[i].value;
            }

            var bills = this.$root.$children[0].billsReceive;

            var receb = 0;

            for (var i in bills) {
                receb += bills[i].value;
            }

            return receb - pag;

        }

    },


};