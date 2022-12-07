//for use in not webworker as replacement for warnm error info

function log(msg) {
  console.log(msg);
}
function info(msg) {
  console.log("INFO:  = " + msg);
}
function warn(msg) {
  console.log("WARN:  = " + msg);
}
function error(msg) {
  console.log("ERROR:  = " + msg);
}

function getTestData() {
  var tabledata = [
    { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
    { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
    { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
    { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
    { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
  ];

  info("\n" + JSON.stringify(tabledata));
  return tabledata;
}

function createOrRecreateTabulator() {
  info("createOrRecreateTabulator")
  //var tableDiv = document.getElementById("example-table"); 

  if (table) {
    info("call destroy");
    table.destroy();
    info("destroyed ?");
    createTable();
  } else {
    info("call new Tabulator");
    table = new Tabulator("#example-table");
  }

  // table.remove();
  //table = tabulator({});

  // see https://stackoverflow.com/questions/46088441/reinitialize-tabulator-on-same-dom-element-with-new-data-and-different-column-co  
  // If you just want to change your column configuration and keep your sorting you could get your current sorting using the getSorters function before updating the columns and data and then resorting:
  var sort = table.getSorters();
  table.setConfig(config);
  table.setData(data);
  table.setSort(sort);
  info("return table")
  return table;
}

function createTable() {
  info("createTable")
  var tabledata = getTestData();
  //create Tabulator on DOM element with id "example-table"
  table = new Tabulator("#example-table", {
    height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: tabledata, //assign data to table
    layout: "fitColumns", //fit columns to width of table (optional)
    columns: [ //Define Table Columns
      { title: "Name", field: "name", width: 150 },
      { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
      { title: "Favourite Color", field: "col" },
      { title: "Date Of Birth", field: "dob", sorter: "date", hozAlign: "center" },
    ],
  });

  //trigger an alert message when the row is clicked
  table.on("rowClick", function(e, row) {
    //alert("Row " + row.getData().id + " Clicked!!!!");
    fetchMetadata();
  });

}
function fillDropdown(id, keyValueList) {
  var select = document.getElementById(id);
  if (!select) {
    warn("Dropdown element not found");
  }
  keyValueList.forEach(function(entry) {
    var opt = document.createElement('option');
    opt.value = entry.key;
    opt.innerHTML = entry.label;
    select.appendChild(opt);
  });
}

function addEventListener(id, type, func) {
  var el = document.getElementById(id);
  if (el) {
    el.addEventListener(type, func);
  } else {
    warn("missing element id = " + id);
  }
}

function addEventListenerClick(id, func) {
  addEventListener(id, "click", func);
}


function handleDatasource(){
  alert("this.value:" + this.value);
}

function addEventListenerChange(id, func) {
  addEventListener(id, "change", func);
}

function fetchMetadata() {
  var url = "http://localhost:8000/tabulator/example01/example01.json";
  fetch(url).then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      alert("fetchMetadata:" + JSON.stringify(res.data));
      fillDropdown("datasource", res.data);
    }));
}
