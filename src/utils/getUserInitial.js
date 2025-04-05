export const getUserInitial = (currentUser) => {
    return currentUser && currentUser.name
      ? currentUser.name.charAt(0).toUpperCase()
      : "";
  };