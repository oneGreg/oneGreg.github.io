"use strict";
class Datasources {
    
   constructor() {
    this.datasources = [];
    this.map = new Map();
  }

  abc(){
  }

  addDatasource(datasource){
    var key = datasource.key;
    var label = datasource.label;
    datasources.push(datasource);
    this.map.set(datasource.key, datasource.label);
  }  
  
  getKeyLabelArray(){
    var arr = [];
    this.map.forEach((value,key)=>{
      var key_value = [key, value.label];
      arr.push(key_value)
      }
    );
    return arr;
  }

  getDatasource(key){
    return this.map.get(key);
  }
}


function getDatasourceTest(){

 return {
  key:"test",
  label:"test",
  layout:"fitColumns",
 	columns:[
	 	{title:"Name", field:"name", width:150},
	 	{title:"Age", field:"age", hozAlign:"left", formatter:"progress"},
	 	{title:"Favourite Color", field:"col"},
	 	{title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
 	],
  tabledata :[
   	{id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
   	{id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
   	{id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
   	{id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
   	{id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  ]
  
  };
}

var datasources = new Datasources();
datasources.addDatasource(getDatasourceTest);

alert("datasources: " +JSON.stringify(datasources.getKeyLabelArray()));