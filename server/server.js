const express = require('express');
const server = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const axios = require('axios');
const {writeFile, readFile, unLink} = require('fs').promises;

const middleware = [cors(),express.json({limit:'50mb'})];

middleware.forEach((it) => server.use(it));

const wFile = (data) => {
    return writeFile(`${__dirname}/users.json`,JSON.stringify(data),{encoding:'utf8'})
};

const rFile = () => {
    return readFile(`${__dirname}/users.json`,{encoding:'utf8'})
        .then((data) => JSON.parse(data))
        .catch(() => {
            axios('https://run.mocky.io/v3/191a8af3-e2eb-43d9-8a14-a701e7380b88')
                .then((data) => {
                    wFile(data)
                })
        })
};

server.get('/api/v1/users',async (req,res) => {
    const users = await rFile();
    await res.json(users)
});

server.post('/api/v1/users',async (req,res) => {
    const newUser = req.body;
    const users = await rFile();
    const usersId = users.map((obj) => obj.id);
    const id = Math.max(...usersId) +1;
    const newUsers = [...users,{id, ...newUser}];
    await wFile(newUsers);
    await res.json({status:'success', id:id})
});

server.patch('/api/v1/users/:userId',async (req, res) => {
    const users = await rFile();
    const {userId} = req.params;
    const updatedUser = req.body;
    const updatedUsers = users.map((user) => user.id === +userId ? {...user,...updatedUser} : user );
    await wFile(updatedUsers);
    await res.json({status:'success'})
});

server.delete('/api/v1/users/:userId',async (req, res) => {
    const users = await rFile();
    const {userId} = req.params;
    const deletedUser = users.map((user) => user.id === +userId ? {...user, isDeleted: true}: user);
    await wFile(deletedUser);
    await res.json({status: 'delete', id: userId})
});

server.delete('/api/v1/users',async (req, res) => {
    await unLink(`${__dirname}/users.json`);
    await res.json({status:'success'})
});
server.listen(port);
console.log(`Serving on http://localhost:${port}`);
