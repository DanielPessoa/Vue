'use strict';

window.billPayComponent = {
    template: '\n    <div class="section">\n        <div class="container">\n            <h4>{{ title }} </h4>\n            <div class="row">\n            <div class="col s6">\n                <div class="card z-depth-2" :class="{\'gray\': status === false, \'green\': status === 0, \'red\': status > 0}">\n                    <div class="card-content white-text">\n                        <p class="card-title">\n                            <i class="material-icons">account_balance</i>\n                        </p>\n                         <h5>{{ status | statusGeneral }} </h5>\n                    </div>\n                </div>\n            </div>\n            <div class="col s6">\n                    <div class="card z-depth-2"">\n                    <div class="card-content">\n                        <p class="card-title">\n                            <i class="material-icons">payment</i>\n                        </p>\n                          <h5>{{ total | numberFormat }}</h5>\n                    </div>\n                </div>\n            </div>\n          </div>\n        </div>\n    </div>\n    <div class="divider"></div>\n    <router-view></router-view>\n    \n    ',
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },
    data: function data() {
        return {
            title: 'Contas a pagar',
            status: false,
            total: 0
        };
    },

    methods: {
        calculateStatus: function calculateStatus(bills) {
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
        updateStatus: function updateStatus() {
            var _this = this;

            Bill.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            Bill.total().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
};