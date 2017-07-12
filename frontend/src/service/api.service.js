let apiServise = (()=>{
    return {
        login: (data, callback)=> {
            fetch('http://localhost:4200/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                })
            })
            .then((response) =>response.json())
            .then((responseJson) => {
                callback(responseJson.token);
            });
        },

        friends: (friend, callback)=>{
            fetch(`http://localhost:4200/friend?name=${friend}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            })
            .then((response) =>response.json())
            .then((responseJson) => {
                callback(responseJson.friends);
                console.log(responseJson.friends);
            });
        },

    };

})();

export default apiServise;