function fetchData(force) {
    // console.log('Fetching data...');
    // element is the react component
    localStorage.fetchingData = 'true';
    // whether or not to go fetch the data
    let fetch = false;

    let data;

    if (localStorage.data) {
        try {
            // console.log('Loading localStorage data');
            data = JSON.parse(localStorage.data);
            localStorage.fetchingData = 'false';
        } catch (e) {
            console.log('Error loading localStorage data; getting new version...');
            fetch = true;
        }
    } else {
        fetch = true;
    }

    if (fetch || force) {
        console.log('Getting data (Axios)...');
        axios.get('https://oop-pro.herokuapp.com/data/').then(
            (response) => {
                console.log('Success (getting data)');
                data = formatData(response.data);
                localStorage.data = JSON.stringify(data);
                localStorage.dataTimestamp = Math.round((new Date()).getTime() / 1000);
                localStorage.fetchingData = 'false';
            },
            (error) => {
                console.log('Server Error  (getting data)');
                console.log(error);
                localStorage.fetchingData = 'false';
            }).catch(
            (error) => {
                console.log('Catching JS Error (getting data)');
                console.log(error);
                localStorage.fetchingData = 'false';
            });
    }
}