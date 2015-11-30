
Meteor.startup(function(){
    if(Topics.find().count() === 0){
        var topics = [
            {
                parent:"JAVA",
                
                tags:["jsp","j2ee","REST"],
                icon:"java.png"
            },
            {
                parent:"Node-js",
                tags:["REST","Integration"],
                icon:"nodejs.png"
            },
             {
                parent:"Mongo-db",
                tags:["Create","Installation"],
                icon:"mongo.png"
            },
             {
                parent:"Neo4j",
                tags:["Graph db","Integration"],
                icon:"neo4j.png"
            },
             {
                parent:"Ionic",
                tags:["Mobile app","hybrid apps"],
                icon:"ionic.png"
            },
        ]
        topics.forEach(function(val,indx){
            Topics.insert(val);
        });
    }
});