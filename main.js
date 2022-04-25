let body = new ELEM(document.body);
let canvas = body.add("canvas").e;
let w = h = 1500;
canvas.width = w;
canvas.height = h;
let ctx = canvas.getContext("2d");
let imgdata = ctx.getImageData(0,0,w,h);
let data = imgdata.data;


let reverseBits = function(n1){
    let n2 = 0;
    for(let i = 0; i < 32; i++){
        n2 |= ((n1&(1<<i))>>>i)<<(31-i);
    }
    return n2;
}

let sum = 0;
for(let i = 0; i < h; i++){
    for(let j = 0; j < w; j++){
        let idx = (i*w+j)*4;
        //let hh = hash32(reverseBits(i))*hash32(j);
        //let r01 = intsToDouble01(hh,hh);
        let r01 = hashNums2((i/50)|0-250,(j/50)|0-250);
        sum += r01;
        let b = Math.floor(r01*256);

        let r02 = hashNums2(((i+1000)/50)|0-250,((j+100)/50)|0-250);
        let c = Math.floor(r02*256);

        let r03 = hashNums2(((i+200)/50)|0-250,((j+10000)/50)|0-250);
        let d = Math.floor(r03*256);
        data[idx+0] = b;
        data[idx+1] = c;
        data[idx+2] = d;
        data[idx+3] = 256;
    }
}
console.log(sum/500/500);

ctx.putImageData(imgdata,0,0);

