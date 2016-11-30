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
    <div class="section">
        <div class="container">
            <h1>{{ title }} </h1>
            <h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">{{ status | statusGeneral }}</h3>
            <div class="row">
                <div class="col s5 offset-s7">
                    <h3>{{ total | numberFormat }}</h3>
                </div>
            </div>
            <menu-component></menu-component>
            
        </div>
    </div>
    <router-view></router-view>
    
    `,
    created() {
      this.updateStatus();
      this.updateTotal();
    },
    data(){
        return {
            title: 'Contas a pagar',
            status: false,
            total: 0
        };
    },
    methods: {
        calculateStatus (bills) {
            if (!bills.length > 0) {
                this.status = false;
            }
            let count = 0;
            for (let i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
    },
        updateStatus() {
            Bill.query().then((response) => {
                this.calculateStatus(response.data);
        });
      },
      updateTotal() {
          Bill.total().then((response) => {
              this.total = response.data.total;
          });
      }
    },
    events:{
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
};