now = new Date
YEAR  = now.getFullYear()
MONTH = now.getMonth() - 1

if ( MONTH == 0 )
{
    YEAR  = YEAR - 1;
    MONTH = 12;
}

console.log(YEAR)
console.log(("0" + (MONTH )).slice(-2))
//console.log(YEAR + "-" + String.valueOf( 100 + MONTH ).substring( 1 ) + "-01")