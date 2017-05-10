<script>
    import UserService from '../services/User';

    export default {
        name: 'article-form',
        data () {
            return {
                title:'NewArticle',
                author: '',
                description:'Lorem ipsum dolar sit amet'
            }
        },
        methods: {
            initAuthorName: function () {
                var that = this;
                UserService.getUserName()
                    .then(
                        function(author) {
                            that.author = author;
                            return author;
                        },
                        function(err){
                            that.$router.push('/login');
                        }
                    );
            },
            close: function () {
                this.$router.push('/articles');
            },
            create: function () {
                this.$http.post(
                    '/api/articles',
                    {
                        title: this.title,
                        author: this.author,
                        description: this.description
                    }
                ).then(
                    function(response) {
                        this.$router.push('/articles');
                    },
                    function(err){
                        console.log(err);
                        this.$router.push('/login');
                    }
                );
            }
        },
        mounted: function () {
           this.initAuthorName();
        }
    }
</script>

<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        Article create dialog.
                    </div>

                    <div class="modal-body">
                        <slot name="header">
                            Article title:
                            <input type="text" v-model="title"/>
                        </slot>
                        <slot name="body">
                            Author:
                            <input type="text" name="pass" v-model="author"/>
                        </slot>
                        <slot name="body">
                            Description:
                            <textarea v-model="description"></textarea>
                        </slot>
                    </div>
                    <div>{{authorizationError}}</div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button" @click="create()">Create</button>
                            <button class="modal-default-button" @click="close()">Close</button>
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


    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }
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