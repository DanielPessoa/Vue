window.billPayComponent = {
    components: {
        'menu-component': billPayMenuComponent,
    },
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
    <h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">{{ status | statusGeneral }}</h3>
    <h3>{{ total | currency ' R$' }}</h3>
    <menu-component></menu-component>
    <router-view></router-view>
    
    `,
    created: function () {
      this.updateStatus();
      this.updateTotal();
    },
    data: function () {
        return {
            title: 'Contas a pagar',
            status: false,
            total: 0
        };
    },
    methods: {
        calculateStatus: function (bills) {
            if (!bills.length > 0) {
                this.status = false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
    },
        updateStatus: function () {
            var self = this;
            Bill.query().then(function (response) {
                self.calculateStatus(response.data);
        });
      },
      updateTotal: function () {
          var self = this;
          Bill.total().then(function (response) {
              self.total = response.data.total;
          });
      }
    },
    events:{
        'change-info': function () {
            this.updateStatus();
            this.updateTotal();
        }
    }
};