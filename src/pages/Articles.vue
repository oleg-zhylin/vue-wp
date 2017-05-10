<script>
    export default {
        name: 'articles',
        data () {
            return {
                articles: ['Articles not found!']
            }
        },
        mounted: function () {
            this.$http.get('/api/articles')
                .then(
                    function(response) {
                        if (response.data.length) {
                            this.articles = response.data;
                        }
                    },
                    function(err){
                        this.$emit('unauthorized');
                    }
                );
        },
        methods: {
            showNewArticleForm: function () {
                this.$router.push('/new-article');
            }
        }
    }
</script>

<template>
    <div id="articles">
        <br/>
        <button type="button" class="btn" @click="showNewArticleForm()">Create Article</button>
        <h1>Articles:</h1>
        <ul>
            <li v-for="article in articles">
                <h2>{{article.title}}</h2>
                <div>{{article.description}}</div>
                <span>Creteted by: {{article.author}} </span>
                <span> at: {{article.modified}}</span>
            </li>
        </ul>
    </div>
</template>