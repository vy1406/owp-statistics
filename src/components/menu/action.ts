
export const fetchApplications = async (onError: () => void) => {
    try {
        const res = await fetch('/api/application');
        if (!res.ok) {
            onError()
            throw new Error('Failed to fetch data');
        }
        const data = await res.json();

        return data;
    } catch (error) {
        onError()
        console.error('Error fetching and downloading data:', error);
    }
};

export const downloadJson = (data: any) => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const filename = `applications_${formattedDate}.json`;

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = filename;

    link.click();
}

