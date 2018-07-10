class RGB{
    constructor(r = 0, g = 0, b = 0){
        this._r = Math.floor(r) > 255 ? 255 : Math.floor(r);
        this._g = Math.floor(g) > 255 ? 255 : Math.floor(g);
        this._b = Math.floor(b) > 255 ? 255 : Math.floor(b);
    }

    get r(){
        return this._r;
    }

    get g(){
        return this._g;
    }

    get b(){
        return this._b;
    }

    set r(value){
        this._r = Math.floor(value) > 255 ? 255 : Math.floor(value);
    }

    set g(value){
        this._g = Math.floor(value) > 255 ? 255 : Math.floor(value);
    }

    set b(value){
        this._b = Math.floor(value) > 255 ? 255 : Math.floor(value);
    }

    toHSV(){
        let r = this._r / 255.0;
        let g = this._g / 255.0;
        let b = this._b / 255.0;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;
        s = max === 0 ? 0 : d / max;
    
        if (max == min) {
            h = 0.0;
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6.0 : 0); break;
                case g: h = (b - r) / d + 2.0; break;
                case b: h = (r - g) / d + 4.0; break;
        }
        
            h /= 6.0;
        }
    
        return new HSV(h, s, v);
    }

    toHexString(){
        return "#" + this._r.toString(16) + this._g.toString(16) + this._b.toString(16);
    }
}

class HSV{
    constructor(h = 0.0, s = 0.0, v = 0.0){
        this._h = h > 1.0 ? 1.0 : h;
        this._s = s > 1.0 ? 1.0 : s;
        this._v = v > 1.0 ? 1.0 : v;
    }

    get h(){
        return this._h;
    }

    get s(){
        return this._s;
    }

    get v(){
        return this._v;
    }

    set h(value){
        this._h = value > 1.0 ? 1.0 : value;
    }

    set s(value){
        this._s = value > 1.0 ? 1.0 : value;
    }

    set v(value){
        this._v = value > 1.0 ? 1.0 : value;
    }

    toRGB(){
        let r, g, b;
        let i = Math.floor(this._h * 6.0);
        let f = this._h * 6.0 - i;
        let p = this._v * (1.0 - this._s);
        let q = this._v * (1.0 - f * this._s);
        let t = this._v * (1.0 - (1.0 - f) * this._s);
    
        switch (i % 6) {
            case 0: r = this._v; g = t; b = p; break;
            case 1: r = q; g = this._v; b = p; break;
            case 2: r = p; g = this._v; b = t; break;
            case 3: r = p; g = q; b = this._v; break;
            case 4: r = t; g = p; b = this._v; break;
            case 5: r = this._v; g = p; b = q; break;
        }
    
        return new RGB(r * 256, g * 256, b * 256);
    }

    toString(){
        return "hsv(" + this._h.toString() + ", " + this._s.toString() + ", " + this._v.toString() + ")";
    }
}