export function getLocalISOTimeString(date: Date|null): string { // Convertir la date en string 
    if(!date){
      return '';
    }
    const dateToConvert: Date = new Date(date);
    const timezoneOffset: number = dateToConvert.getTimezoneOffset() * 60000;
    return new Date(dateToConvert.getTime() - timezoneOffset).toISOString().slice(0, -1);
  }

  // La méthode divise la date ne deux 
  export function formatDate(inputDate: string): string{
    return inputDate.split('T')[0];
  }