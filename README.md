# growing-pj

若手教育で課された最低限の環境構築を体系的に学ぶために作られたものです。
ゴールは環境構築を行いHello worldが出来るようになるとこまでです。

![](./環境.drawio)

## 環境

当方の環境を示しますが、基本的にはその他環境でも動くかと思います。

* MacBook Pro mid2019
* Docker Desktop 4.25
* Python 3.9

## 環境構築

前書き：基本的にファイルの記述に関しては、ファイルを参照してください。解説も記載してあります。

1. 任意のディレクトリでプロジェクトを作成します。
    `mkdir 任意のプロジェクト名`
2. プロジェクトのディレクトリに移動します。
    `cd 任意のプロジェクト名`
3. React,Python,nginxのDockerをそれぞれ作成するので、まずはディレクトリを作成します。
    `mkdir docker`
4. Reactを使用するのでディレクトリを作成します。
    `mkdir nodejs`
5. そのディレクトリで`node.js`用の`Dockerfile`を作成します。
    `touch docker/nodejs/Dockerfile`
6. Pythonを利用するのディレクトリを作成します。
    `mkdir docker/python`
7. Pythonのパッケージ管理ファイル`requirements.txt`を作成します。
    `touch docker/pyhton/requirements.txt`
8. Pythonの`Dockerfile`を作成します。
    `touch docker/pyhton/Dockerfile`
9. nginxを利用するので、ディレクトリを作成します。
    `mkdir docker/nginx`
10. nginxのコンフィグファイルを作成します。
    `touch docker/nginx/default.conf`
11. 3つのDockerを個別に実行するのが手間なので、一括で起動してくれる設定を作成します。
    `touch docker-compose.yml`
12. Fastapiのコードを書いていきます。backendディレクトリを作成してコーディングしましょう。
    `mkdir backend`
    `touch backend/main.py`
13. ここまでで、一度コンテナをビルドしていきましょう。
    `docker-compose build`
14. Reactプロジェクトの作成の作成をします。
    `docker-compose run --rm frontend sh -c "npm install -g create-react-app && create-react-appreact-project --template typescript"`
15. コンテナを起動します。
    `docker-compose up -d`

ここまで実行すると以下のような画面が表示されます。
![](./images/image1.png)


