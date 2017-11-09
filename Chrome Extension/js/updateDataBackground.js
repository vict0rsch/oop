function updateData() {
    if (localStorage.dataTimestamp) {
        const ts = parseInt(localStorage.dataTimestamp, 10);
        const ts2 = Math.round((new Date()).getTime() / 1000);

        const checkEvery = 20;//3600 * 24; // 1 day
    }
    if (!localStorage.dataTimestamp || ts2 - ts > checkEvery) {
        console.log('Looking for DB Update...');
        axios.get('http://oop-pro.herokuapp.com/db_meta_data').then(
            (response) => {
                console.log('Success (getting metadata data)');
                const dbMetaData = response.data;
                const oldMetaData = localStorage.dbMetaData ? JSON.parse(localStorage.dbMetaData) : undefined;
                if (oldMetaData === undefined || oldMetaData.version < dbMetaData.version) {
                    fetchData();
                    localStorage.dbMetaData = JSON.stringify(dbMetaData);
                }
                localStorage.dataTimestamp = Math.round((new Date()).getTime() / 1000);
            },
            (error) => {
                console.log('Server Error  (getting metadata data)');
                console.log(error);
            }).catch(
            (error) => {
                console.log('Catching JS Error (getting metadata data)');
                console.log(error);
            });
    }

}