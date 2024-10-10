## .vscode/settings.json

```jsonc
{
   "vscode-super-jump.configs": [
        // app://self/foo/bar => src/Resource/App/Foo/Bar.php
        {
            "triggerLanguages": [
                "php",
                "twig",
                "shellscript"
            ],
            "regex": "app:\\/\\/self\\/([^'\"\\{\\?#]*)",
            "searchFileName": "$1",
            "searchFileNameConvertRules": [
                "pascalCase"
            ],
            "searchDirectories": [
                "src/Resource/App"
            ],
            "searchFileExtension": ".php"
        },
        // page://self/foo/bar => src/Resource/Page/Foo/Bar.php
        {
            "triggerLanguages": [
                "php",
                "twig",
                "shellscript"
            ],
            "regex": "page:\\/\\/self\\/([^'\"\\{\\?#]*)",
            "searchFileName": "$1",
            "searchFileNameConvertRules": [
                "pascalCase"
            ],
            "searchDirectories": [
                "src/Resource/Page",
                "src/Resource/Page/Admin",
                "src/Resource/Page/Cli",
                "src/Resource/Page/Content"
            ],
            "searchFileExtension": ".php"
        },
        // #[JsonSchema(schema: 'article.get.json')] => var/json_schema/article.get.json
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "#\\[JsonSchema\\(.*?schema\\s?:\\s?'([^']*)'.*?\\)\\]",
            "searchDirectories": [
                "var/json_schema"
            ],
            "searchFileName": "$1",
        },
        // #[JsonSchema(schema: 'article.post.json', params: 'article.post.json')] => var/json_validate/article.post.json
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "#\\[JsonSchema\\(.*?params\\s?:\\s?'([^']*)'.*?\\)\\]",
            "searchDirectories": [
                "var/json_validate"
            ],
            "searchFileName": "$1",
        },
        // #[DbQuery(id:'foo') => var/db/sql/foo.sql
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "DbQuery\\(id\\s?:\\s?'([^']*)'",
            "searchDirectories": [
                "var/db/sql"
            ],
            "searchFileName": "$1",
            "searchFileExtension": ".sql",
        },
        // #[Query(id:'getFoo') => var/db/sql/getFoo.sql
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "Query\\(id\\s?:\\s?'([^']*)'",
            "searchDirectories": [
                "var/db/sql"
            ],
            "searchFileName": "$1",
            "searchFileExtension": ".sql",
        },
        // $map->get('/category', '/path/to') => src/Resource/Page/Category.php
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "(route|get|delete|head|options|patch|post|put|generate)\\(['\"]([^'\"]*?)['\"]",
            "searchFileName": "$2",
            "searchFileNameConvertRules": [
                "pascalCase"
            ],
            "searchDirectories": [
                "src/Resource/Page",
                "src/Resource/Page/Content"
            ],
            "searchFileExtension": ".php",
        },
        // WebQuery('foo') => var/web_query.json
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "WebQuery\\('[^']*'",
            "searchDirectories": [
                "var"
            ],
            "searchFileName": "web_query",
            "searchFileExtension": ".json",
        },
        // #[Route('/foo/bar')] => src/Resource/Page/Content/Foo/Bar.php
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "Route\\(['\"]([^'\"]*)['\"]",
            "searchFileName": "$1",
            "searchFileNameConvertRules": [
                "pascalCase"
            ],
            "searchDirectories": [
                "src/Resource/Page/Content"
            ],
            "searchFileExtension": ".php",
        },
        // #[Named('getFoo')] => var/db/sql/getFoo.sql
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "Named\\(['\"]([^'\"]*)['\"]",
            "searchFileName": "$1",
            "searchDirectories": [
                "var/db/sql"
            ],
            "searchFileExtension": ".sql",
        },
        // #[Sql('getFoo')] => var/db/sql/getFoo.sql
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "Sql\\(['\"]([^'\"]*)['\"]",
            "searchFileName": "$1",
            "searchDirectories": [
                "var/db/sql"
            ],
            "searchFileExtension": ".sql",
        },
        // render('/partial/foo/bar') => var/qiq/template/partial/foo/bar.php
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": "render\\(['\"]([^'\"]*?)['\"]",
            "searchFileName": "$1",
            "searchDirectories": [
                "var/qiq/template"
            ],
            "searchFileExtension": ".php",
        },
        // $this->query['getFoo'] => var/db/sql/getFoo.sql
        {
            "triggerLanguages": [
                "php"
            ],
            "regex": ">query\\[['\"]([^'\"]*?)['\"]",
            "searchFileName": "$1",
            "searchDirectories": [
                "var/db/sql"
            ],
            "searchFileExtension": ".sql",
        },
    ],
}
```

## TODO

| Category | Code | Jump to | Status |
|---------|-----|-------------|------|
| app or page | 'app://self/article' | src/Resource/App/Article.php | ✅ |
| | 'page://self/article' | src/Resource/Page/Content/Article.php | ✅ |
| | #[Refresh(uri: 'app://self/foo{?id}')] | src/Resource/App/Foo.php | ✅ |
| | #[SurrogateKey(vary: ['id'], uri: ['app://self/blogger{?id}'])] | src/Resource/App/Blogger.php | ✅ |
| | #[RefreshBy(['app://self/foo', 'app://self/bar'])] | src/Resource/App/Foo.php | ✅ |
| json schema | #[JsonSchema(schema: 'article.get.json')] | var/json_schema/article.get.json | ✅ |
| | #[JsonSchema(schema: 'article.post.json', params: 'article.post.json')] | var/json_validate/article.post.json | ✅ |
| path | $map->get('/category', '/path/to') | src/Resource/Page/Category.php | ✅ |
| | $map->route('/my-page', '/path/to'); | src/Resource/Page/MyPage.php | ✅ |
| | render('/foo/bar') | src/Resource/Page/Foo/Bar.php | ✅ |
| | $this->router->generate('/foo/bar') | src/Resource/Page/Foo/Bar.php | ✅ |
| | #[Route('/foo/bar')] | src/Resource/Page/Content/Foo/Bar.php | ✅ |
| | Auth(redirect: '/my-page/')] | src/Resource/Page/Content/MyPage.php | ❌ |
| | Link(rel: 'article', href: '/api/article{?ulid}'] | src/Resource/Page/Admin/Api/Article.php | ❌ |
| query | #[WebQuery('foo') | var/web_query.json | ✅ |
| | #[DbQuery(id:'foo') | var/db/sql/foo.sql | ✅ |
| | #[Query(id: 'getFoo')] | var/db/sql/getFoo.sql | ✅ |
| | #[Named('getFoo')] | var/db/sql/getFoo.sql | ✅ |
| | #[Sql('getFoo')] | var/db/sql/getFoo.sql | ✅ |
| | $this->query['getFoo'] | var/db/sql/getFoo.sql | ✅ |
