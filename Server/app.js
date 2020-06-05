const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const mysql = require("mysql")

app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const db = mysql.createConnection({
    host     : '112.124.25.19',
    user     : 'root',
    password : 'my123',
    port: '3306',
    database: 'Course_MS'
});

db.connect( (err) => {
    if(err) throw err;
    console.log('连接成功')
})

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get("/getstudent", (req, res) => {
    let sql = "SELECT * FROM student"
    db.query(sql, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    })
})

app.get("/getcourse", (req, res) => {
    let sql = "SELECT * FROM course"
    db.query(sql, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    })
})

app.get("/getchoose", (req, res) => {
    let sql = "SELECT * FROM choose"
    db.query(sql, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    })
})

app.get("/addStudent", (req, res) => {

    const stu_num = req.query.stu_num;
    const name = req.query.name;
    const age = req.query.age;
    const sex = req.query.sex;
    const depart = req.query.depart;


    const sql = 'INSERT INTO student (stu_num,name,age,sex,depart) VALUES (?,?,?,?,?)'
    const value = [stu_num, name, age, sex, depart];

    db.query(sql, value, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    });
})

app.get("/addCourse", (req, res) => {

    const cour_num = req.query.cour_num;
    const cour_name = req.query.cour_name;
    const pre = req.query.pre;


    const sql = 'INSERT INTO course (cour_num,cour_name,pre) VALUES (?,?,?)'
    const value = [cour_num, cour_name, pre];

    db.query(sql, value, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    });
})

app.get("/addChoose", (req, res) => {

    const stu_numC = req.query.stu_numC;
    const cour_numC = req.query.cour_numC;
    const grade = req.query.grade
    // const stu_numC = 'S4'
    // const cour_numC = 'C2'
    // const grade = '20'


    const sql = 'INSERT INTO choose (stu_numC,cour_numC,grade) VALUES (?,?,?)'
    const value = [stu_numC, cour_numC, grade];
    console.log(value)

    db.query(sql, value, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    });
})

app.get("/deleteStudent", (req, res) => {

    const stu_num = req.query.stu_num;
    // const stu_numC = 'S4'
    // const cour_numC = 'C2'
    // const grade = '20'


    const sql = 'delete from student where stu_num = (?)'
    const value = [stu_num];
    console.log(value)

    db.query(sql, value, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    });
})

app.get("/deleteCourse", (req, res) => {

    const cour_num = req.query.cour_num;
    // const stu_numC = 'S4'
    // const cour_numC = 'C2'
    // const grade = '20'


    const sql = 'delete from course where cour_num = (?)'
    const value = [cour_num];
    console.log(value)

    db.query(sql, value, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    });
})

app.get("/deleteChoose", (req, res) => {

    const stu_numC = req.query.stu_numC;
    const cour_numC = req.query.cour_numC
    // const stu_numC = 'S4'
    // const cour_numC = 'C2'
    // const grade = '20'


    const sql = 'delete from choose where stu_numC = (?) and cour_numC = (?)'
    const value = [stu_numC, cour_numC];
    console.log(value)

    db.query(sql, value, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    });
})


app.get("/updateStudent", (req, res) => {

    const stu_num = req.query.stu_num;
    console.log("stu_num" + stu_num)
    const name = req.query.name;
    const age = req.query.age;
    const sex = req.query.sex;
    const depart = req.query.depart;
    // const stu_numC = 'S4'
    // const cour_numC = 'C2'
    // const grade = '20'


    const sql = 'update student set stu_num=(?),name=(?),age=(?),sex=(?),depart=(?) where stu_num=(?) '
    const value = [stu_num, name, age, sex, depart, stu_num];
    console.log(value)

    db.query(sql, value, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    });
})

app.get("/updateCourse", (req, res) => {

    const cour_num = req.query.cour_num;
    const cour_name = req.query.cour_name;
    const pre = req.query.pre;


    const sql = 'update course set cour_num=(?),cour_name=(?),pre=(?) where cour_num=(?)'
    const value = [cour_num, cour_name, pre, cour_num];

    db.query(sql, value, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    });
})

app.get("/updateChoose", (req, res) => {

    const stu_numC = req.query.stu_numC;
    const cour_numC = req.query.cour_numC;
    const grade = req.query.grade
    // const stu_numC = 'S4'
    // const cour_numC = 'C2'
    // const grade = '20'


    const sql = 'update choose set stu_numC=(?),cour_numC=(?),grade=(?) where stu_numC=(?) and cour_numC=(?)'
    const value = [stu_numC, cour_numC, grade, stu_numC, cour_numC];
    console.log(value)

    db.query(sql, value, (error, result) => {
        if (error) {
            res.send(error)
            console.log(error)
            // console.error(error.sqlMessage);
            return false;
        } else {
            res.send(result)
        }
    });
})
