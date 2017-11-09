function updateData() {
    if (localStorage.dataTimestamp) {
        const ts = parseInt(localStorage.dataTimestamp, 10);
        const ts2 = Math.round((new Date()).getTime() / 1000);

        const checkEvery = 20;//3600 * 24; // 1 day

        if (ts2 - ts > checkEvery) {
            console.log('Looking for DB Update...');
            axios.get('http://oop-pro.herokuapp.com/db_meta_data/').then(
                (response) => {
                    console.log('Success (updating data)');
                    const dbMetaData = JSON.parse(response.data);
                    const oldMetaData = JSON.parse(localStorage.dbMetaData);
                    if (oldMetaData === undefined || oldMetaData.version < dbMetaData.version){
                        fetchData();
                        localStorage.dbMetaData = JSON.stringify(dbMetaData);
                    }
                },
                (error) => {
                    console.log('Server Error  (updating data)');
                    console.log(error);
                }).catch(
                (error) => {
                    console.log('Catching JS Error (updating data)');
                    console.log(error);
                });
        }
    }
}