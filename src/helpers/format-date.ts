const formatDate = (date: Date | null | undefined): string => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    console.log("Formatted date:", date); // Ajoutez cette ligne
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  } else {
    // Gérer le cas où la date n'est pas définie ou invalide
    console.log("Date not defined or invalid:", date); // Ajoutez cette ligne
    return 'Date non définie';
  }
};

export default formatDate;


