/**
 * Global variables
 */

const databaseURL = SpreadsheetApp.getActiveSpreadsheet().getRange("Drill-Down Settings!B2").getValue(); // with sheet ID and spreadsheet ID
const databaseRange = SpreadsheetApp.getActiveSpreadsheet().getRange("Drill-Down Settings!B3").getValue(); // a1 notation
const subjectEmail = JSON.parse(PropertiesService.getScriptProperties().setProperty("SUBJECT_EMAIL")) || "" // fuelfinance mail account that has an access for the database (manager or analyst) 

/**
 * Function of creating html service using dataTable.html {file} => assigned to the button
 *  
 * Return {ui} interactive dialog window with the DataTable
 */

function drillDown() {

  const ui = SpreadsheetApp.getUi()
  if (!databaseID || !databaseRange) {

    ui.alert("⛔ Database URL or/and Transactions range is not provided", " ", ui.ButtonSet.OK)

  }

  else {
    const htmlServ = HtmlService.createTemplateFromFile("dataTable").evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setWidth(5000).setHeight(5000)
    ui.showModalDialog(htmlServ, ' ')
  }
}


/**
 * Function of the Drill-down feature execution => executes in the dataTable
 *    
 * Return {null}
 */

function processing() {
  // Ininitialize active {cell} parameters
  const range = SpreadsheetApp.getCurrentCell();
  const col = range.getColumn();
  const row = range.getRow()
  const activeSheet = range.getSheet();
  const activeSheetName = activeSheet.getName();

  const month = activeSheet.getRange(3, col).getValue(); // row item
  const category = activeSheet.getRange(row, 2).getValue(); // header name
  Logger.log(`${new Date(Date.parse(month)).getMonth()}-${new Date(Date.parse(month)).getFullYear()}`)
  Logger.log(category)


  const ui = SpreadsheetApp.getUi()

  function toMYFormat_(date) { return `${new Date(Date.parse(date)).getMonth()}-${new Date(Date.parse(date)).getFullYear()}` }


  // Assigning functions for the filter callback parameter by the Sheet name {sheet}
  const reportsFilters = {
    "P&L": function (record) { return toMYFormat_(record[1]) == toMYFormat_(month) && record[19] == category },
    "CF": function (record) { return toMYFormat_(record[0]) == toMYFormat_(month) && record[19] == category },
    "BS": function (record) {
      return ((toMYFormat_(record[0]) == toMYFormat_(month) && record.slice(22, 26).some(x => x == category))
        || (toMYFormat_(record[1]) == toMYFormat_(month) && record.slice(26, 30).some(x => x == category))
        || (toMYFormat_(record[2]) == toMYFormat_(month) && record.slice(30, 34).some(x => x == category)))
    },
  };


  var sheetToCheck = Object.keys(reportsFilters)

  // Checking for target active spreadsheets, active range
  if (sheetToCheck.includes(activeSheetName) && col > 4 && row > 3 && month && category && range.getValue()) {


    // 1. Getting all transactions from the source databaseSheet {sheet}
    // - prepering grid range for the argument of getSheetValues functions
    var gridRange = FuelFinanceLibraryv2.a1Notation2GridRange(databaseURL, databaseRange)
    var transactions = FuelFinanceLibraryv2.getSheetValues(subjectEmail, databaseURL, gridRange)
    // 2. Getting headers from the transactions
    var header = transactions.shift()
    // 3. Filtering transactions using reportsFilters object getting function using activeSheetName as a key
    transactions = transactions.filter(reportsFilters[activeSheetName]).map(x => x.slice(0, 20))
    header = header.slice(0, 20)

    Logger.log(transactions)
    Logger.log(header)

    // Checking for filtered transactions => if they avalaible
    if (!!transactions.length) {

      // 1. Propering transaction data for the htmlservice DataTable displaying 
      var result = { data: transactions, headers: header.map(head => { return { title: head } }), sheet: activeSheetName }
      Logger.log(result.sheet)
      // 2. Initiating htmlservice with the DataTable 

      return result
    }
    // If filtered transactions {array} is empty => displaying error
    else {
      ui
        .alert("⛔ Not found transactions for the active selection", "Be sure that you didn`t select Calculated field in a row (Subcategory, Subtotals)", SpreadsheetApp.getUi().ButtonSet.OK)
    }

  }
  // Case if the active value is equil to 0 => displaying error
  else if (range.getValue() == 0) {
    ui
      .alert("⛔ Active cell is equal to zero", " ", SpreadsheetApp.getUi().ButtonSet.OK)
  }

  // Other cases => displaying error
  else {
    ui

      // showModalDialog(HtmlService.createHtmlOutput("<p>⛔ Active cell should be between Category (row) and Date (column)</p>").setWidth(1200).setHeight(800))
      .alert("⛔ Active cell should be between Category (row) and Date (column)", " ", SpreadsheetApp.getUi().ButtonSet.OK)


  }
}
