import http from 'k6/http';


export default function () {
    // const urlProductInfo = 'http://localhost:3000/products/1';
    // http.get(urlProductInfo);

    // const urlStylesInfo = 'http://localhost:3000/products/1/styles';
    // http.get(urlStylesInfo);

    const urlRelatedIno = 'http://localhost:3000/products/1/related';
    http.get(urlRelatedIno);
}

