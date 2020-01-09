const sha1 = {
    sign: function (params, appSecret) {
        let strArray = [];
        let paramNameArray = [];
        for (let key in params) {
            paramNameArray.push(key);
        }
        paramNameArray.sort();
        strArray.push(appSecret);
        let paramName = null;
        for (let i in paramNameArray) {
            paramName = paramNameArray[i];
            strArray.push(paramName)
            strArray.push(params[paramName]);
        }
        strArray.push(appSecret);
        return sha1._hex_sha1(strArray.join("")).toUpperCase();
    },
    _hex_sha1: function (str) {
        return sha1._rstr2hex(sha1._rstr_sha1(sha1._str2rstr_utf8(str)));
    },
    _str2rstr_utf8: function (input) {
        let output = "";
        let i = -1;
        let x, y;
        while (++i < input.length) {
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
                    0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                    0x80 | ((x >>> 6) & 0x3F),
                    0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                    0x80 | ((x >>> 12) & 0x3F),
                    0x80 | ((x >>> 6) & 0x3F),
                    0x80 | (x & 0x3F));
        }
        return output;
    },
    _rstr_sha1: function (str) {
        return sha1._binb2rstr(sha1._binb_sha1(sha1._rstr2binb(str), str.length * 8));
    },
    _rstr2hex: function (input) {
        let hexcase = 0;
        let hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        let output = "";
        let x;
        for (let i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
                + hex_tab.charAt(x & 0x0F);
        }
        return output;
    },
    _rstr2binb: function(input) {
        let output = Array(input.length >> 2);
        for (let i = 0; i < output.length; i++)
            output[i] = 0;
        for (let i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
        return output;
    },
    _binb_sha1: function(x, len) {
        x[len >> 5] |= 0x80 << (24 - len % 32);
        x[((len + 64 >> 9) << 4) + 15] = len;
        let w = Array(80);
        let a = 1732584193;
        let b = -271733879;
        let c = -1732584194;
        let d = 271733878;
        let e = -1009589776;
        for (let i = 0; i < x.length; i += 16) {
            let olda = a;
            let oldb = b;
            let oldc = c;
            let oldd = d;
            let olde = e;
            for (let j = 0; j < 80; j++) {
                if (j < 16) w[j] = x[i + j];
                else w[j] = sha1._bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                let t = sha1._safe_add(sha1._safe_add(sha1._bit_rol(a, 5), sha1._sha1_ft(j, b, c, d)),
                    sha1._safe_add(sha1._safe_add(e, w[j]), sha1._sha1_kt(j)));
                e = d;
                d = c;
                c = sha1._bit_rol(b, 30);
                b = a;
                a = t;
            }
            a = sha1._safe_add(a, olda);
            b = sha1._safe_add(b, oldb);
            c = sha1._safe_add(c, oldc);
            d = sha1._safe_add(d, oldd);
            e = sha1._safe_add(e, olde);
        }
        return Array(a, b, c, d, e);
    },
    _binb2rstr: function(input) {
        let output = "";
        for (let i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
        return output;
    },
    _bit_rol: function(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    },
    _safe_add: function(x, y) {
        let lsw = (x & 0xFFFF) + (y & 0xFFFF);
        let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    },
    _sha1_ft: function(t, b, c, d) {
        if (t < 20) return (b & c) | ((~b) & d);
        if (t < 40) return b ^ c ^ d;
        if (t < 60) return (b & c) | (b & d) | (c & d);
        return b ^ c ^ d;
    },
    _sha1_kt: function(t) {
        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
            (t < 60) ? -1894007588 : -899497514;
    }
};
export default sha1.sign