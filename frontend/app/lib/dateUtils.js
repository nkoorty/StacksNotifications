export const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
};
