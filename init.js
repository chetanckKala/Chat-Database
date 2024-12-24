const mongoose = require("mongoose")
const Chat = require("./models/chat.js")
const { faker } = require('@faker-js/faker');



function getChat() {
    return {
        from: faker.person.fullName(),
        to: faker.person.fullName(),
        message: faker.lorem.sentence(),
        created_at: faker.date.anytime()
    };
}


async function main() { await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp") }
main().then(()=> {console.log(">>> mongodb connection secured")})



// -----------------------------------------------------------------------------------------

for (let i = 0; i < 100; i++) 
{
    const chat = getChat()
    const newChat = new Chat(chat)
    newChat.save()
                .then((res)=> {console.log(res)})
                .catch((err)=> {console.log(err)})
}

