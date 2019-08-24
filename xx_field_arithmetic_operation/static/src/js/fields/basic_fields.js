odoo.define('xx_field_arithmetic_operation.basic_fields', function (require) {
    "use strict";

    var BasicFields = require('web.basic_fields');
    var field_utils = require('web.field_utils');
    var pyUtils = require('web.py_utils');

    BasicFields.FieldMonetary.include({
        /**
         * Convert value set by user if starts with =
         **/
        _setValue: function (val, options) {
            var input_value = val;
            val = val.trim();
            if (val.startsWith('=')) {
                try {
                    // Convert Input Arithmetic Operation to Value
                    val = this._convertArithmeticOperation(val.substr(1));
                    // Put back the val in user locale
                    val = this._formatValue(val);
                    // Set value
                    this.$input.val(val);
                } catch (err) {
                    val = input_value;
                }
            }
            return this._super(val, options);
        },
        /**
         * Supported arithmetic operations: + - * / ( )
         **/
        _convertArithmeticOperation: function (expr, context) {
            var val = expr.replace(new RegExp(/( )/g), '');
            var converted_string = '';
            for (let v of val.split(new RegExp(/([-+*/()^])/g))) {
                if (!['+', '-', '*', '/', '(', ')'].includes(v) && v.length) {
                    v = field_utils.parse.float(v);
                }
                converted_string += v;
            }
            return pyUtils.py_eval(converted_string, context);
        }
    });

    BasicFields.NumericField.include({
        /**
         * Convert value set by user if starts with =
         **/
        _setValue: function (val, options) {
            var input_value = val;
            val = val.trim();
            if (val.startsWith('=')) {
                try {
                    // Convert Input Arithmetic Operation to Value
                    val = this._convertArithmeticOperation(val.substr(1));
                    // Format back the val in user locale
                    val = this._formatValue(val);
                    // Set value
                    this.$input.val(val);
                } catch (err) {
                    val = input_value;
                }
            }
            return this._super(val, options);
        },
        /**
         * Supported arithmetic operations: + - * / ( )
         **/
        _convertArithmeticOperation: function (expr, context) {
            var val = expr.replace(new RegExp(/( )/g), '');
            var converted_string = '';
            for (let v of val.split(new RegExp(/([-+*/()^])/g))) {
                if (!['+', '-', '*', '/', '(', ')'].includes(v) && v.length) {
                    v = field_utils.parse.float(v);
                }
                converted_string += v;
            }
            return pyUtils.py_eval(converted_string, context);
        }
    });
});
