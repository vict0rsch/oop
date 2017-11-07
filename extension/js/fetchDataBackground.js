function fetchData() {
    // console.log('Fetching data...');
    // element is the react component

    // whether or not to go fetch the data
    let fetch = false;

    let data;

    if (localStorage.data) {
        try {
            // console.log('Loading localStorage data');
            data = JSON.parse(localStorage.data);
        } catch (e) {
            console.log('Error loading localStorage data; getting new version...');
            fetch = true;
        }
    } else {
        fetch = true;
    }

    if (fetch) {
        console.log('Getting data (Axios)...');
        axios.get('http://oop-pro.herokuapp.com/data/').then(
            (response) => {
                console.log('Success (getting data)');
                data = formatData(response.data);
                localStorage.data = JSON.stringify(data);
            },
            (error) => {
                console.log('Server Error  (getting data)');
                console.log(error);
            }).catch(
            (error) => {
                console.log('Catching JS Error (getting data)');
                console.log(error);
            });
    }
}