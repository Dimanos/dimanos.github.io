class Block{
    set setPosition(pos){
        this.position = pos;
    }

    get getPosition(){
        return this.position;
    }

    set setCommand(value){
        this.commandStr = value;
    }

    get getCommand(){
        return this.commandStr;
    }

    set setColor(rgb){
        let fillColor = rgb2str(rgb)
        let hsv = rgb2hsv(rgb);
        hsv = { h: hsv.h, s: hsv.s, v: Math.floor(hsv.v * 0.35) };
        let strokeColor = rgb2str(hsv2rgb(hsv))
    }
}