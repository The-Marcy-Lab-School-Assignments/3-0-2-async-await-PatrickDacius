export const fetchHandler = async (url, options = {}) => {
    try {
        const newFetchedData = await fetch(url, options);

        if (!newFetchedData.ok) {
            throw new Error(`Fetch failed with status - ${newFetchedData.status}, ${newFetchedData.text}`);
        }


        const contentType = newFetchedData.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');

        let data = undefined;
        if (isJson) {
            data = await newFetchedData.json();
        } else {
            data = await newFetchedData.text();
        }

        const tuple = [data, null];
        return tuple;
    } catch (error) {
        console.warn(error); // Log the error
        const tuple = [null, error];
        return tuple;
    }
};

