const utils = {
    dateUtils: {
        // yyyyMMdd -> yyyy年MM月dd日
        formatDateStrCN: function(str) {
            let year = str.substring(0, 4);
            let month = str.substring(4, 6);
            let day = str.substring(6, 8);
            return year + "年" + month + "月" + day + '日';
        },
        // yyyy-MM-dd -> yyyy年MM月dd日
        formatToCN: function(str) {
            let year = str.substring(0, 4);
            let month = str.substring(5, 7);
            let day = str.substring(8, 10);
            return year + "年" + month + "月" + day + '日';
        },
        // yyyyMMdd -> yyyy-MM-dd
        formatDateStr: function(str) {
            let year = str.substring(0, 4);
            let month = str.substring(4, 6);
            let day = str.substring(6, 8);
            return year + "-" + month + "-" + day;
        },
        // yyyyMMddHHmmss -> yyyy-MM-dd HH:mm:ss
        formatTimeStr: function(str) {
            let year = str.substring(0, 4);
            let month = str.substring(4, 6);
            let day = str.substring(6, 8);
            let hour = str.substring(8, 10);
            let minite = str.substring(10, 12);
            let second = str.substring(12, 14);
            return year + "-" + month + "-" + day + " " + hour + ":" + minite + ":" + second;
        },
        format: function (date) {
            let _format = utils.dateUtils._format;
            return '' + date.getFullYear() + _format(date.getMonth() + 1) + _format(date.getDate()) +
                _format(date.getHours()) + _format(date.getMinutes()) + _format(date.getSeconds());
        },
        _format: function (number) {
            return (number < 10 ? ('0' + number) : number);
        }
    }
};

export default utils
