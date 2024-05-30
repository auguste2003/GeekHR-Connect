export function getLocalISOTimeString(date: Date|null): string { // Convertir la date en string 
    if(!date){
      return '';
    }
    const dateToConvert: Date = new Date(date);
    const timezoneOffset: number = dateToConvert.getTimezoneOffset() * 60000;
    return new Date(dateToConvert.getTime() - timezoneOffset).toISOString().slice(0, -1);
  }