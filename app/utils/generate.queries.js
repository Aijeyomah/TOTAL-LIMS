export function getValues(specification, id, specId) {
    const result = specification.map((element) => ["" + id + "", "" + specId + "", element.testData + "", "" + element.productSpecification])
    return result;
}

export function constructValues(values) {
    let formedValues = '';
    values.forEach((item, index) => {
        let innerString = '';
        let comma = ","
        let finalBracket = '),'
        item.forEach((item2, index2) => {
            // separate by comma
            innerString = innerString + "'" + item2  + "'" + comma;
            // if at the end of element in inner array remove the last comma
            if (item.length === index2 + 1) innerString = innerString.slice(0, -1)
            // add '),' once you get to the end of array element
            if (item2.length === index2 + 1) finalBracket = '),';
            // add ');' to the end of final array
            if (values.length === index + 1) finalBracket = ');';
        })
        formedValues = formedValues + '(' + innerString + finalBracket;
    });
    return formedValues
}