# Gyazo Cocomiro

Gyazo Cocomiro is a server that has Gyazo compatible API.

## How to run on your local machine

### Clone this repository

```sh
$ git clone https://github.com/hakobera/gyazo-cocomiro.git
$ cd gyazo-cocomiro
```

### Set AWS environments

```sh
$ echo "export AWS_ACCESS_KEY_ID=[your aws access key]" >> .env
$ echo "export AWS_SECRET_ACCESS_KEY=[your aws secret key]" >> .env
$ echo "export AWS_REGION=[aws region name]" >> .env
$ echo "export AWS_S3_BUCKET=[aws s3 bucket name]" >> .env
```

### Install npm modules

```sh
$ npm install
```

### Run server

```sh
$ ./script/start.sh
```

Then open http://localhost:3000 on your browser.
