# What image do you want to start building on?
FROM node:latest

#Make a folder in your image where your appls source code can live 
RUN mkdir -p /src/app

#Tell your container where your apps soruce code will live 
WORKDIR /src/app

#WHAT COURCE CODE DO YOU WHAT TO COPY AND WHERE TO PUT IT?
COPY . /src/app

#Does your app have any dependcies that should be installed?
RUN npm install 

#What port will the contrainer talk to the outside world with once create?
EXPOSE 3000 

#How do you start your app?
CMD ["npm", "start"]