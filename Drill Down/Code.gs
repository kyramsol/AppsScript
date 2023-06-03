/**
 * Import data using Import Settings {sheet} => imported from FuelFinanceLibrary1
 *    
 * Return {null}
 */



function importrange_with_checkboxes() {
  FuelFinanceLibrary1.ImRange_with_checkbox()
}




function import_budg_act() {

  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var activesheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = activesheet.getActiveCell();
  Logger.log(cell.getA1Notation())

    if(activesheet.getName() == "CF PRJCT / ACT" && cell.getA1Notation() == "B3"){

      var budg_sheet = ss.getSheetByName('CF PRJCT / ACT')
      var budg_filter = budg_sheet.getRange("B3").getValue()
 
      var settings = ss.getSheetByName('Settings')
      var id_budg = settings.getRange("B2").getValue()
      var sheet_budg = settings.getRange("C2").getValue()
      var range_budg = settings.getRange("D2").getValue()

        var target_filter = getSheetBySpreadsheetsId(id_budg,sheet_budg).getRange(3,2,1,1)

        target_filter.clearContent()

        target_filter.setValue(budg_filter)
  

  Utilities.sleep(10000)

      var source = getSheetBySpreadsheetsId(id_budg,sheet_budg).getRange(range_budg).getValues()
      var row = getSheetById(settings.getRange("E2").getValue()).getRange(settings.getRange("F2").getValue()).getRow()
      var col = getSheetById(settings.getRange("E2").getValue()).getRange(settings.getRange("F2").getValue()).getColumn()
      var target = getSheetById(settings.getRange("E2").getValue()).getRange(row,col,source.length,source[0].length)
      target.setValues(source)

    }

}


/**
 * Simple function that get {sheet} object
 * 
 * @param {string} spreadsheetsid - spreadsheet id
 * @param {string} sheetid - sheet id
 * 
 *    
 * Return {sheet}
 */

function getSheetBySpreadsheetsId(spreadsheetsid,sheetid) {
    return SpreadsheetApp.openById(spreadsheetsid).getSheets().filter(
      function(s) {return s.getSheetId() == sheetid}
    )[0]
  } 

/**
 * Get ID of the Active Sheet
 * 
 * @param {string} id - sheet id of Active Sheet
 * 
 *    
 * Return {sheet}
 */
   
    function getSheetById(id) {
    return SpreadsheetApp.getActive().getSheets().filter(
      function(s) {return s.getSheetId() == id}
    )[0]
  } 

  //\\ Get range from row and column//\\
  function get_cell_rc(row, column){
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(row, column)
  } 