function getPathUrl(values){
    let path = '?'
    for (let key in values){
        path = path + key
        path = path + '='
        path = path + values[key]
        path = path + '&'
    }
    path=path.substring(0,path.length-1)
    console.log(path)
}

const object={stu_numC: "123", cour_numC: "123", grade: "11111"}

getPathUrl(object)