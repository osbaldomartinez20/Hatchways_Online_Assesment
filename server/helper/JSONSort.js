/**
 ** Sort an array of JSON by a property.
 */
exports.sortjsonarray = (arr, prop="id", order="asc") => {
    if (arr == null) {
        return [];
    }

    if (!Array.isArray(arr)) {
        throw new TypeError("sort-json-array expects an array.");
    }


    if (order == "asc") {
        return arr.sort(compare(prop, 1));
    } else if (order == "desc") {
        return arr.sort(compare(prop, 0));
    }
}

//compares the attributes of the JSONs in the array to sort them in the specified way.
function compare(attr, value) {
    if (value) {
        return function (a, b) {
            var x = a[attr] === null ? "" : "" + a[attr],
                y = b[attr] === null ? "" : "" + b[attr];
            return +x < +y ? -1 : +x > +y ? 1 : 0;
        };
    } else {
        return function (a, b) {
            var x = a[attr] === null ? "" : "" + a[attr],
                y = b[attr] === null ? "" : "" + b[attr];
            return +x < +y ? 1 : +x > +y ? -1 : 0;
        };
    }
}
