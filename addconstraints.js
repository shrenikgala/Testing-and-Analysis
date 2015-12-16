var fs=require('fs');
var filepath=__dirname+'/test/index.js';


var a ='describe("randomstring.generate(options)", function() {';
fs.appendFile(filepath,a,function (err) {
      if (err) throw err;
     // console.log('The "data to append" was appended to file!');

    });

var test1 = '\n it("accepts length as an optional first argument", function() {assert.equal(random(';

var test2 = '\nit("accepts length as an option param", function() {assert.equal(random({ length';



for(var i=1;i<50;i++){
     fs.appendFile(filepath,test1+i+").length,"+i+");});",function (err) {
      if (err) throw err;
     
    });

    fs.appendFile(filepath,test2+": "+i+" }).length, "+i+");});",function (err) {
      if (err) throw err;
     
    });

}
fs.appendFile(filepath,"\n});",function (err) {
      if (err) throw err;
     // console.log('The "data to append" was appended to file!');

    });

/*
// it("defaults to 32 characters in length", function(){
 //   assert.equal(random().length, i);
 // });



  it("accepts length as an optional first argument", function() {
    assert.equal(random(i).length, i);
  });

  it("accepts length as an option param", function() {
    assert.equal(random({ length: i }).length, i);
  });


}
});

  */    
