# Python3.9のイメージ選択
FROM python:3.9-alpine

# PythonのPostgreSQL用ライブラリがこの方法じゃないとコケる
RUN apk --no-cache add build-base
RUN apk add postgresql-dev=9.6.10-r0 --repository=http://dl-cdn.alpinelinux.org/alpine/v3.5/main

# 作業するディレクトリを設定
WORKDIR /app

# PCのローカルファイルをDocker内の指定したディレクトリに格納(今回は/app)
COPY ./docker/python/requirements.txt .


# Pythonのパッケージインストール
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# PCのローカルファイルをDocker内の指定したディレクトリに格納(今回は/app)
COPY ./backend/ .

# 実行するコマンドを記述
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]