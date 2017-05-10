<script>

import UserService from '../services/User';

export default {
    name: 'profile',
    data () {
        return {
            name:'',
            user_id: ''
        }
    },
    methods: {
        initUserData: function () {
            var that = this;
            UserService.getUserInfo()
                .then(
                    function(user) {
                        that.name = user.name;
                        that.user_id = user.user_id;
                    },
                    function(err){
                        that.$emit('unauthorized');
                    }
                );
        }
    },
    mounted: function () {
        this.initUserData();
  },
}
</script>

<template>
  <div id="profile">
    <h1>Profile settings</h1>
      <ul>
          <li>Name: {{name}}</li>
          <li>ID: {{user_id}}</li>
      </ul>
  </div>
</template>