# Projeto_MQTT_PAM

Para utilizar o projeto você deve baixar o projeto e executar os seguintes comandos:

npm i

npx expo start

Antes de abrir sua página na web, você deve criar uma conta no HiveMQ e criar um cliente que possa fazer Subscribe e Publish.

Após isso, crie um arquivo chamado .env na pasta central do projeto e adicione os seguintes dados:

MQTT_host=url fornecida pelo HiveMQ

MQTT_port=8884

MQTT_path=/mqtt

MQTT_user=login do usuário HiveMQ

MQTT_pass=senha do usuário HiveMQ

