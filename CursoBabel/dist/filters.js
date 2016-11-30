"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('doneLabel', function (value) {
    return value == 0 ? "Não Paga" : "Paga";
});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma Conta Cadastrada";
    }
    if (!value) {
        return "Nenhuma conta a Pagar";
    } else {
        return "Existem: " + value + " contas a serem pagas";
    };
});

Vue.filter('numberFormat', {
    read: function read(value) {
        var number = 0;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            number = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g)[0] || [0];
        }
        return new Intl.NumberFormat('pt-BR', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write: function write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});