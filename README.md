# blog-front
新`mesimasi.com`のフロントエンドです  
[サーバーサイド](https://github.com/masibw/blog-server) が必要です

# 使い方
`.env.sample`を`.env`や`.env.production`へ書き換えてください  


`docker network create blog-network`を実行したあと  
`yarn up`で開発用のdockerが起動します   
`yarn up:prod`で本番用のdockerが起動します  
