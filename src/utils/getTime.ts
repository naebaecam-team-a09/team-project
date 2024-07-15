export function getBaseTime(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours < 2 || (hours === 2 && minutes < 10)) {
    return '2300';
  } else if (hours < 5 || (hours === 5 && minutes < 10)) {
    return '0200';
  } else if (hours < 8 || (hours === 8 && minutes < 10)) {
    return '0500';
  } else if (hours < 11 || (hours === 11 && minutes < 10)) {
    return '0800';
  } else if (hours < 14 || (hours === 14 && minutes < 10)) {
    return '1100';
  } else if (hours < 17 || (hours === 17 && minutes < 10)) {
    return '1400';
  } else if (hours < 20 || (hours === 20 && minutes < 10)) {
    return '1700';
  } else if (hours < 23 || (hours === 23 && minutes < 10)) {
    return '2000';
  } else {
    return '2300';
  }
}

export function getDateDay() {
  const today = new Date();
  return (today.getHours() <= 2 && today.getMinutes() <= 10) || today.getHours() <= 1
    ? String(today.getDate() - 1).padStart(2, '0')
    : String(today.getDate()).padStart(2, '0');
}
