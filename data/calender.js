export  const calender = (date)=>{
    const numberDate = Date.parse(date);
    return new Date( numberDate* 1 - (226900*24*60*60*1000 - 5 * 60 * 60 * 1000 ) ).toISOString().slice(0,10)
}