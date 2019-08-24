odoo.define('xx_field_arithmetic_operation.form_widgets', function (require) {
    "use strict";

    var FormWidgets = require('web.form_widgets');
    var pyEval = require('web.pyeval');
    var formats = require('web.formats');

    FormWidgets.FieldMonetary.include({
        /**
         * Convert value set by user if starts with =
         **/
        set_value: function (val) {
            var input_value = val;
            val = val.toString().trim();
            if (val.startsWith('=')) {
                try {
                    // Convert Input Arithmetic Operation to Value
                    val = this._convert_arithmetic_operation(val.substr(1));
                    // Put back the val in user locale
                    val = this.format_value(val);
                    // Set value
                    this.$input.val(val);
                } catch (err) {
                    val = input_value;
                }
            }
            return this._super(val);
        },
        /**
         * Supported arithmetic operations: + - * / ( )
         **/
        _convert_arithmetic_operation: function (expr, context) {
            var val = expr.replace(new RegExp(/( )/g), '');
            var converted_string = '';
            for (let v of val.split(new RegExp(/([-+*/()^])/g))) {
                if (!['+', '-', '*', '/', '(', ')'].includes(v) && v.length) {
                    v = formats.parse_value(v, {type:"float"});
                }
                converted_string += v;
            }
            return pyEval.py_eval(converted_string, context);
        }
    });

    FormWidgets.FieldFloat.include({
        /**
         * Convert value set by user if starts with =
         **/
        set_value: function (val, options) {
            var input_value = val;
            val = val.trim();
            if (val.startsWith('=')) {
                try {
                    // Convert Input Arithmetic Operation to Value
                    val = this._convert_arithmetic_operation(val.substr(1));
                    // Format back the val in user locale
                    val = this.format_value(val);
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
        _convert_arithmetic_operation: function (expr, context) {
            var val = expr.replace(new RegExp(/( )/g), '');
            var converted_string = '';
            for (let v of val.split(new RegExp(/([-+*/()^])/g))) {
                if (!['+', '-', '*', '/', '(', ')'].includes(v) && v.length) {
                    v = formats.parse_value(v, {type:"float"});
                }
                converted_string += v;
            }
            return pyEval.py_eval(converted_string, context);
        }
    });

    FormWidgets.FieldInteger.include({
        /**
         * Convert value set by user if starts with =
         **/
        set_value: function (val, options) {
            var input_value = val;
            val = val.trim();
            if (val.startsWith('=')) {
                try {
                    // Convert Input Arithmetic Operation to Value
                    val = this._convert_arithmetic_operation(val.substr(1));
                    // Format back the val in user locale
                    val = this.format_value(val);
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
        _convert_arithmetic_operation: function (expr, context) {
            var val = expr.replace(new RegExp(/( )/g), '');
            var converted_string = '';
            for (let v of val.split(new RegExp(/([-+*/()^])/g))) {
                if (!['+', '-', '*', '/', '(', ')'].includes(v) && v.length) {
                    v = formats.parse_value(v, {type:"float"});
                }
                converted_string += v;
            }
            return pyEval.py_eval(converted_string, context);
        }
    });
});
