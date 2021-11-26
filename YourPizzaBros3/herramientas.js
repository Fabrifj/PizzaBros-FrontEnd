
function stringAFecha(fecha)
{
    var parts = fecha.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    return mydate;
}

module.exports = {
    stringAFecha
  };