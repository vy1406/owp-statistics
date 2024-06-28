/**
 * Formats a given date as DD/MM/YYYY.
 * @param date - The date to format. Can be a Date object, a string, or a number.
 * @returns A string representing the date in DD/MM/YYYY format.
 */
export function formatDate(date: Date | string | number | null | undefined): string {

    if (!date) {
        return 'N/A';
    }

    const parsedDate = new Date(date);


    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = parsedDate.getFullYear();

    return `${day}/${month}/${year}`;
}

/**
* Calculates the number of days passed since a given date until today if the status is not "Pending".
* @param date - The date to compare. Can be a Date object, a string, or a number.
* @param status - The status to check.
* @returns The number of days passed since the given date if status is not "Pending". If the status is "Pending", it returns 0.
*/

export function calculateDaysSinceDate(date: Date | string | number | null | undefined): string {
    if (!date) {
        return 'N/A';
    }

    const givenDate = new Date(date);
    const today = new Date();

    if (isNaN(givenDate.getTime())) {
        throw new Error("Invalid date");
    }

    const timeDifference = today.getTime() - givenDate.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysDifference.toString();
}