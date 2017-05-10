<script>
    import UserService from '../services/User';

    export default {
      name: 'login-form',
      data () {
          return {
            authorizationError: "",
            grant_type: "password",
            client_id: "android",
            client_secret: "SomeRandomCharsAndNumbers",
            username: "myapi",
            password: "abc1234"
          }
        },
            methods: {
                close: function () {
                    this.$emit('close-login-form');
                },
                getAuthData: function () {
                    return {
                        grant_type: this.grant_type,
                        client_id: this.client_id,
                        client_secret: this.client_secret,
                        username: this.username,
                        password: this.password
                    }
                },
                login: function () {
                    var that = this;
                    UserService.login (that.getAuthData())
                        .then(
                            function(response) {
                                that.$emit('login-success');
                            }
                        ).catch(function (errText){
                        that.authorizationError = errText;
                    });
                }
            }
    }
</script>

<template id="login-form">
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            Введите имя пользователя:
                            <input type="text" name="login" v-model="username"/>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            Введите пароль:
                            <input type="password" name="pass" v-model="password"/>
                        </slot>
                    </div>
                    <div>{{authorizationError}}</div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button" @click="login()">Вход</button>
                            <button class="modal-default-button" @click="close()">Отмена</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>