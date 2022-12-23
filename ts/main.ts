async function getTasks() {
    let url: string = `https://assignment-api.piton.com.tr/docs/`
    const response = await fetch(url);
    console.log(response)
    const responseData = await response.json();
    console.log('responseData: ')
    console.log(responseData)
    if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        console.log(error)
        throw error;
    }
    // return responseData
}

getTasks()