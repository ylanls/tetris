(function ($, undefined) {
    $.fn.extend({
        initTable: function () {
            var cell = 30;
            var col = 12;
            var html = '<table>';
            for (var i = 0; i < cell; i++) {
                html += '<tr>';
                for (var j = 0; j < col; j++) {
                    html += $.format('<td data-x={0} data-y={1}>', j, i);
                }
                html += '</tr>';
            }
            html += '</table>';
            this.append(html);
            var result = { cell: 30, col: 12 };
            return result;
        }
    })
    $.extend({
        format: function (source, params) {
            if (arguments.length == 1)
                return function () {
                    var args = $.makeArray(arguments);
                    args.unshift(source);
                    return $.format.apply(this, args);
                };
            if (arguments.length > 2 && params.constructor != Array) {
                params = $.makeArray(arguments).slice(1);
            }
            if (params.constructor != Array) {
                params = [params];
            }
            $.each(params, function (i, n) {
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
            });
            return source;
        }
    })
})(jQuery)