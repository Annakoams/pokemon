const formatDate = (date: Date | null | undefined): string => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  } else {
    // Gérer le cas où la date n'est pas définie ou invalide
    return 'Date non définie';
  }
};

export default formatDate;