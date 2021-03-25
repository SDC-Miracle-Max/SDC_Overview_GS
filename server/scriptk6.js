import http from 'k6/http';


export default function () {
    // var res = http.get('http://localhost:3000/products/')
    // console.log('Response time for connection to Products was ' + String(res.timings.duration) + ' ms');

    // var res = http.get('http://localhost:3000/products/1')
    // console.log('Response time for Product Info-General API was ' + String(res.timings.duration) + ' ms');

    // var res = http.get('http://localhost:3000/products/1/styles')
    // console.log('Response time for Product Info-Styles API was ' + String(res.timings.duration) + ' ms');

    var res = http.get('http://localhost:3000/products/1/related')
    console.log('Response time for Product Info-Related API was ' + String(res.timings.duration) + ' ms');

}

