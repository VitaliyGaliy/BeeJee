export const sortObj = (o) => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});

export const fixedEncodeURIComponent = (str) => {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

export const serialize = function (obj) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(fixedEncodeURIComponent(p) + "=" + fixedEncodeURIComponent(obj[p]));
        }
    }
    return str.join("&");
}