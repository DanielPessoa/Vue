window.billPayComponent = {
    template: `
    <div class="section">
        <div class="container">
            <h4>{{ title }} </h4>
            <div class="row">
            <div class="col s6">
                <div class="card z-depth-2" :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
                    <div class="card-content white-text">
                        <p class="card-title">
                            <i class="material-icons">account_balance</i>
                        </p>
                         <h5>{{ status | statusGeneral }} </h5>
                    </div>
                </div>
            </div>
            <div class="col s6">
                    <div class="card z-depth-2"">
                    <div class="card-content">
                        <p class="card-title">
                            <i class="material-icons">payment</i>
                        </p>
                          <h5>{{ total | numberFormat }}</h5>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
    <div class="divider"></div>
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
            return this.total = response.data.total;
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