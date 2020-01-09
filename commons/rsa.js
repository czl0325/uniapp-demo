const RSAUtils = function(publicKey) {
	var key = publicKey.split("@");
	var hexToChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f'];
	var hexatrigesimalToChar = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'
    ];
	var lowBitMasks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
        0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
        0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];
	var highBitMasks = [0x0000, 0x8000, 0xC000, 0xE000, 0xF000, 0xF800,
        0xFC00, 0xFE00, 0xFF00, 0xFF80, 0xFFC0, 0xFFE0,
        0xFFF0, 0xFFF8, 0xFFFC, 0xFFFE, 0xFFFF];
	var biRadixBits = 16;
    var bitsPerDigit = biRadixBits;
	var biRadix = 1 << 16; // = 2^16 = 65536
	var biHalfRadix = biRadix >>> 1;
	var maxDigitVal = biRadix - 1;
	var biRadixSquared = biRadix * biRadix;
	var bigZero = new BigInt()
	this.biToString = function (x, radix) { // 2 <= radix <= 36
		var b = new BigInt();
		b.digits[0] = radix;
		var qr = this.biDivideModulo(x, b);
		var result = hexatrigesimalToChar[qr[1].digits[0]];
		while (this.biCompare(qr[0], bigZero) == 1) {
			qr = this.biDivideModulo(qr[0], b);
			result += hexatrigesimalToChar[qr[1].digits[0]];
		}
		return (x.isNeg ? "-" : "") + this.reverseStr(result);
	};
	this.biShiftRight = function(x, n) {
		var digitCount = Math.floor(n / bitsPerDigit);
		var result = new BigInt();
		this.arrayCopy(x.digits, digitCount, result.digits, 0,
			x.digits.length - digitCount);
		var bits = n % bitsPerDigit;
		var leftBits = bitsPerDigit - bits;
		for (var i = 0, i1 = i + 1; i < result.digits.length - 1; ++i, ++i1) {
			result.digits[i] = (result.digits[i] >>> bits) |
				((result.digits[i1] & lowBitMasks[bits]) << leftBits);
		}
		result.digits[result.digits.length - 1] >>>= bits;
		result.isNeg = x.isNeg;
		return result;
	};
	this.biHighIndex = function(x) {
		var result = x.digits.length - 1;
		while (result > 0 && x.digits[result] == 0) --result;
		return result;
	};
	this.biToHex = function(x) {
		var result = "";
		var n = this.biHighIndex(x);
		for (var i = n; i > -1; --i) {
			result += this.digitToHex(x.digits[i]);
		}
		return result;
	};
	this.multiplyMod = function(x, y) {
		var xy = this.biMultiply(x, y);
		return this.modulo(xy);
	};
	this.modulo = function(x) {
		var modulus = this.biCopy(this.m);
		var k = this.biHighIndex(modulus) + 1;
        var q1 = this.biDivideByRadixPower(x, k - 1);
		var b2k = new BigInt();
		b2k.digits[2 * k] = 1; // b2k = b^(2k)
		var mu = this.biDivideModulo(b2k, modulus)[0];
        var q2 = this.biMultiply(q1, mu);
        var q3 = this.biDivideByRadixPower(q2, k + 1);
        var r1 = this.biModuloByRadixPower(x, k + 1);
        var r2term = this.biMultiply(q3, modulus);
        var r2 = this.biModuloByRadixPower(r2term, k + 1);
        var r = this.biSubtract(r1, r2);
		var bkplus1 = new BigInt();
		bkplus1.digits[k + 1] = 1;
        if (r.isNeg) {
            r = this.biAdd(r, bkplus1);
        }
        var rgtem = this.biCompare(r, modulus) >= 0;
        while (rgtem) {
            r = this.biSubtract(r, modulus);
            rgtem = this.biCompare(r, modulus) >= 0;
        }
        return r;
	}
	this.biDivide = function(x, y) {
        return this.biDivideModulo(x, y)[0];
    };
	this.biModuloByRadixPower = function(x, n) {
        var result = new BigInt();
        this.arrayCopy(x.digits, 0, result.digits, 0, n);
        return result;
    };
	this.biDivideByRadixPower = function(x, n) {
        var result = new BigInt();
        this.arrayCopy(x.digits, n, result.digits, 0, result.digits.length - n);
        return result;
    };
	this.biMultiply = function(x, y) {
        var result = new BigInt();
        var c;
        var n = this.biHighIndex(x);
        var t = this.biHighIndex(y);
        var u, uv, k;

        for (var i = 0; i <= t; ++i) {
            c = 0;
            k = i;
            for (var j = 0; j <= n; ++j, ++k) {
                uv = result.digits[k] + x.digits[j] * y.digits[i] + c;
                result.digits[k] = uv & maxDigitVal;
                c = uv >>> biRadixBits;
                //c = Math.floor(uv / biRadix);
            }
            result.digits[i + n + 1] = c;
        }
        // Someone give me a logical xor, please.
        result.isNeg = x.isNeg != y.isNeg;
        return result;
    };
	this.biCompare = function(x, y) {
        if (x.isNeg != y.isNeg) {
            return 1 - 2 * Number(x.isNeg);
        }
        for (var i = x.digits.length - 1; i >= 0; --i) {
            if (x.digits[i] != y.digits[i]) {
                if (x.isNeg) {
                    return 1 - 2 * Number(x.digits[i] > y.digits[i]);
                } else {
                    return 1 - 2 * Number(x.digits[i] < y.digits[i]);
                }
            }
        }
        return 0;
    };
	this.biDivideModulo = function(x, y) {
        var nb = this.biNumBits(x);
        var tb = this.biNumBits(y);
        var origYIsNeg = y.isNeg;
        var q, r;
        if (nb < tb) {
            // |x| < |y|
            if (x.isNeg) {
                q = this.biCopy(bigOne);
                q.isNeg = !y.isNeg;
                x.isNeg = false;
                y.isNeg = false;
                r = this.biSubtract(y, x);
                // Restore signs, 'cause they're references.
                x.isNeg = true;
                y.isNeg = origYIsNeg;
            } else {
                q = new BigInt();
                r = this.biCopy(x);
            }
            return [q, r];
        }

        q = new BigInt();
        r = x;

        // Normalize Y.
        var t = Math.ceil(tb / bitsPerDigit) - 1;
        var lambda = 0;
        while (y.digits[t] < biHalfRadix) {
            y = this.biShiftLeft(y, 1);
            ++lambda;
            ++tb;
            t = Math.ceil(tb / bitsPerDigit) - 1;
        }
        // Shift r over to keep the quotient constant. We'll shift the
        // remainder back at the end.
        r = this.biShiftLeft(r, lambda);
        nb += lambda; // Update the bit count for x.
        var n = Math.ceil(nb / bitsPerDigit) - 1;

        var b = this.biMultiplyByRadixPower(y, n - t);
        while (this.biCompare(r, b) != -1) {
            ++q.digits[n - t];
            r = this.biSubtract(r, b);
        }
        for (var i = n; i > t; --i) {
            var ri = (i >= r.digits.length) ? 0 : r.digits[i];
            var ri1 = (i - 1 >= r.digits.length) ? 0 : r.digits[i - 1];
            var ri2 = (i - 2 >= r.digits.length) ? 0 : r.digits[i - 2];
            var yt = (t >= y.digits.length) ? 0 : y.digits[t];
            var yt1 = (t - 1 >= y.digits.length) ? 0 : y.digits[t - 1];
            if (ri == yt) {
                q.digits[i - t - 1] = maxDigitVal;
            } else {
                q.digits[i - t - 1] = Math.floor((ri * biRadix + ri1) / yt);
            }

            var c1 = q.digits[i - t - 1] * ((yt * biRadix) + yt1);
            var c2 = (ri * biRadixSquared) + ((ri1 * biRadix) + ri2);
            while (c1 > c2) {
                --q.digits[i - t - 1];
                c1 = q.digits[i - t - 1] * ((yt * biRadix) | yt1);
                c2 = (ri * biRadix * biRadix) + ((ri1 * biRadix) + ri2);
            }

            b = this.biMultiplyByRadixPower(y, i - t - 1);
            r = this.biSubtract(r, this.biMultiplyDigit(b, q.digits[i - t - 1]));
            if (r.isNeg) {
                r = this.biAdd(r, b);
                --q.digits[i - t - 1];
            }
        }
        r = this.biShiftRight(r, lambda);
        // Fiddle with the signs and stuff to make sure that 0 <= r < y.
        q.isNeg = x.isNeg != origYIsNeg;
        if (x.isNeg) {
            if (origYIsNeg) {
                q = this.biAdd(q, bigOne);
            } else {
                q = this.biSubtract(q, bigOne);
            }
            y = this.biShiftRight(y, lambda);
            r = this.biSubtract(y, r);
        }
        // Check for the unbelievably stupid degenerate case of r == -0.
        if (r.digits[0] == 0 && this.biHighIndex(r) == 0) r.isNeg = false;

        return [q, r];
    };
	this.biAdd = function(x, y) {
        var result;

        if (x.isNeg != y.isNeg) {
            y.isNeg = !y.isNeg;
            result = this.biSubtract(x, y);
            y.isNeg = !y.isNeg;
        }
        else {
            result = new BigInt();
            var c = 0;
            var n;
            for (var i = 0; i < x.digits.length; ++i) {
                n = x.digits[i] + y.digits[i] + c;
                result.digits[i] = n % biRadix;
                c = Number(n >= biRadix);
            }
            result.isNeg = x.isNeg;
        }
        return result;
    };
	this.biMultiplyDigit = function(x, y) {
        var n, c, uv;
        var result = new BigInt();
        n = this.biHighIndex(x);
        c = 0;
        for (var j = 0; j <= n; ++j) {
            uv = result.digits[j] + x.digits[j] * y + c;
            result.digits[j] = uv & maxDigitVal;
            c = uv >>> biRadixBits;
            //c = Math.floor(uv / biRadix);
        }
        result.digits[1 + n] = c;
        return result;
    };
	this.biSubtract = function(x, y) {
        var result;
        if (x.isNeg != y.isNeg) {
            y.isNeg = !y.isNeg;
            result = biAdd(x, y);
            y.isNeg = !y.isNeg;
        } else {
            result = new BigInt();
            var n, c;
            c = 0;
            for (var i = 0; i < x.digits.length; ++i) {
                n = x.digits[i] - y.digits[i] + c;
                result.digits[i] = n % biRadix;
                // Stupid non-conforming modulus operation.
                if (result.digits[i] < 0) result.digits[i] += biRadix;
                c = 0 - Number(n < 0);
            }
            // Fix up the negative sign, if any.
            if (c == -1) {
                c = 0;
                for (var i = 0; i < x.digits.length; ++i) {
                    n = 0 - result.digits[i] + c;
                    result.digits[i] = n % biRadix;
                    // Stupid non-conforming modulus operation.
                    if (result.digits[i] < 0) result.digits[i] += biRadix;
                    c = 0 - Number(n < 0);
                }
                // Result is opposite sign of arguments.
                result.isNeg = !x.isNeg;
            } else {
                // Result is same sign.
                result.isNeg = x.isNeg;
            }
        }
        return result;
    };
	this.biMultiplyByRadixPower = function(x, n) {
        var result = new BigInt();
        this.arrayCopy(x.digits, 0, result.digits, n, result.digits.length - n);
        return result;
    };
	this.arrayCopy = function(src, srcStart, dest, destStart, n) {
        var m = Math.min(srcStart + n, src.length);
        for (var i = srcStart, j = destStart; i < m; ++i, ++j) {
            dest[j] = src[i];
        }
    };
	this.biShiftLeft = function(x, n) {
        var digitCount = Math.floor(n / bitsPerDigit);
        var result = new BigInt();
        this.arrayCopy(x.digits, 0, result.digits, digitCount,
            result.digits.length - digitCount);
        var bits = n % bitsPerDigit;
        var rightBits = bitsPerDigit - bits;
        for (var i = result.digits.length - 1, i1 = i - 1; i > 0; --i, --i1) {
            result.digits[i] = ((result.digits[i] << bits) & maxDigitVal) |
                ((result.digits[i1] & highBitMasks[bits]) >>>
                    (rightBits));
        }
        result.digits[0] = ((result.digits[i] << bits) & maxDigitVal);
        result.isNeg = x.isNeg;
        return result;
    };
	this.biCopy = function(bi) {
        var result = new BigInt(true);
        result.digits = bi.digits.slice(0);
        result.isNeg = bi.isNeg;
        return result;
    };
	this.biNumBits = function(x) {
        var n = this.biHighIndex(x);
        var d = x.digits[n];
        var m = (n + 1) * bitsPerDigit;
        var result;
        for (result = m; result > m - bitsPerDigit; --result) {
            if ((d & 0x8000) != 0) break;
            d <<= 1;
        }
        return result;
    };
	this.digitToHex = function(n) {
		var mask = 0xf;
		var result = "";
		for (var i = 0; i < 4; ++i) {
			result += hexToChar[n & mask];
			n >>>= 4;
		}
		return this.reverseStr(result);
	};
	this.reverseStr = function(s) {
		var result = "";
		for (var i = s.length - 1; i > -1; --i) {
			result += s.charAt(i);
		}
		return result;
	};
	this.biFromHex = function(s) {
		var result = new BigInt();
        var sl = s.length;
        for (var i = sl, j = 0; i > 0; i -= 4, ++j) {
            result.digits[j] = this.hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)));
        }
        return result;
	};
	this.hexToDigit = function(s) {
        var result = 0;
        var sl = Math.min(s.length, 4);
        for (var i = 0; i < sl; ++i) {
            result <<= 4;
            result |= this.charToHex(s.charCodeAt(i));
        }
        return result;
    };
	this.charToHex = function(c) {
        var ZERO = 48;
        var NINE = ZERO + 9;
        var littleA = 97;
        var littleZ = littleA + 25;
        var bigA = 65;
        var bigZ = 65 + 25;
        var result;

        if (c >= ZERO && c <= NINE) {
            result = c - ZERO;
        } else if (c >= bigA && c <= bigZ) {
            result = 10 + c - bigA;
        } else if (c >= littleA && c <= littleZ) {
            result = 10 + c - littleA;
        } else {
            result = 0;
        }
        return result;
    };
	this.decryptionExponent = "";
	this.e = this.biFromHex(key[0]);
	this.m = this.biFromHex(key[1]);
	this.chunkSize = 2 * this.biHighIndex(this.m);
	this.radix = 16;
};
RSAUtils.prototype.encryptedString = function(s){
	var a = [];
	var sl = s.length;
	var i = 0;
	while (i < sl) {
		a[i] = s.charCodeAt(i);
		i++;
	}

	while (a.length % this.chunkSize != 0) {
		a[i++] = 0;
	}
	var al = a.length;
	var result = "";
	var j, k, block;
	for (i = 0; i < al; i += this.chunkSize) {
		block = new BigInt();
		j = 0;
		for (k = i; k < i + this.chunkSize; ++j) {
			block.digits[j] = a[k++];
			block.digits[j] += a[k++] << 8;
		}
		var crypt = new BigInt();
        crypt.digits[0] = 1;
        var a = block;
        var k = this.e;
        while (true) {
            if ((k.digits[0] & 1) != 0) crypt = this.multiplyMod(crypt, a);
            k = this.biShiftRight(k, 1);
            if (k.digits[0] == 0 && this.biHighIndex(k) == 0) break;
            a = this.multiplyMod(a, a);
        }
		var text = this.radix == 16 ? this.biToHex(crypt) : this.biToString(crypt, this.radix);
		result += text + " ";
	}
	return result.substring(0, result.length - 1); // Remove last space.
};

function BigInt(flag) {
	var ZERO_ARRAY = new Array(130);
	for (var iza = 0; iza < ZERO_ARRAY.length; iza++) {
		ZERO_ARRAY[iza] = 0;	
	}
	if (typeof flag == "boolean" && flag == true) {
		this.digits = null;
	} else {
		this.digits = ZERO_ARRAY.slice(0);
	}
	this.isNeg = false;
};

export default RSAUtils;