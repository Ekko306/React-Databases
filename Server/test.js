var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : '112.124.25.19',       
  user     : 'root',              
  password : 'my123',       
  port: '3306',                   
  database: 'Course' 
}); 
 
connection.connect();
 
var  sql = 'SELECT * FROM runoob_tbl';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});
 
connection.end();
