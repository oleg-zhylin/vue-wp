import Vue from 'vue'

export default {
    getUserName () {
        return Vue.http.get('/api/users/info')
            .then(
                function(response) {
                    return response.body.name;
                },
                function(err){
                    throw "Error: "
                    console.log (err);
                }
            );
    },
    getUserInfo () {
        return Vue.http.get('/api/users/info')
            .then(
                function(response) {
                    return {
                        name: response.body.name,
                        user_id: response.body.user_id
                    }

                },
                function(err){
                    throw "Error: "
                    console.log (err);
                }
            );
    },
    login (cred) {
        return Vue.http.post('/api/oauth/token',cred)
            .then(
                function(response) {
                    //need to refactoring in event emit
                    localStorage.setItem(
                        'Authorization', response.data.token_type + ' ' + response.data.access_token
                    );
                    return 'success';
                },
                function(err){
                    throw err.body.error_description
                }
            );
    }
}