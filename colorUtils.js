function rgb2hsv(rgb) {
    let r = rgb.r / 255.0;
    let g = rgb.g / 255.0;
    let b = rgb.b / 255.0;

    let h, s, v;
  
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    if (max === min){
        h = 0.0;
    } else if (max === r && g >= b){
        h = 60.0 * (g - b) / (max - min);
    } else if (max === r && g < b){
        h = 60.0 * (g - b) / (max - min) + 360.0;
    } else if (max === g){
        h = 60.0 * (b - r) / (max - min) + 120.0;
    } else if (max === b){
        h = 60.0 * (r - g) / (max - min) + 240.0;
    }

    if (max === 0){
        s = 0;
    }else{
        s = (1.0 - min / max) * 100.0;
    }

    v = max * 100.0;
  
    return {h: h, s: s, v: v};
}

function hsv2rgb(hsv) {
    let h = Math.round(hsv.h);
    let s = Math.round(hsv.s);
    let v = Math.round(hsv.v);
    let r, g, b;
  
    let Hi = (h / 60) % 6;
    let Vmin = ((100 - s) * v) / 100;
    let a = (v - Vmin) * ((h % 60) / 60);
    let Vinc = Vmin + a;
    let Vdec = v - a;

    v = Math.round(v * 2.55);
    Vmin = Math.round(Vmin * 2.55);
    Vinc = Math.round(Vinc * 2.55);
    Vdec = Math.round(Vdec * 2.55);
  
    switch (Hi) {
        case 0: r = v;    g = Vinc; b = Vmin; break;
        case 1: r = Vdec; g = v;    b = Vmin; break;
        case 2: r = Vmin; g = v;    b = Vinc; break;
        case 3: r = Vmin; g = Vdec; b = v; break;
        case 4: r = Vinc; g = Vmin; b = v; break;
        case 5: r = v;    g = Vmin; b = Vdec; break;
    }
  
    return { r: r, g: g, b: b };
}

function rgb2str(rgb){
    return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
}