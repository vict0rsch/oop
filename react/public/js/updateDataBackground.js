function updateData() {
    if (localStorage.data_timestamp) {
        const ts = parseInt(localStorage.data_timestamp, 10);
        const ts2 = Math.round((new Date()).getTime() / 1000);

        const checkEvery = 3600 * 24; // 1 day

        if (ts2 - ts > checkEvery) {
            
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