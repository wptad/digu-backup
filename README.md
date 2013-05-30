# What

Backup your data from www.aidigu.com 

#How to use it

1. Rename `/config/config.default.js` to `/config/config.js` And Input the username and passowrd, and whose data you want to back-up.
2. run `node lib/server.js`
3. data will saved into `/data/data.txt`

#config/config.js

```
module.exports ={
    USER:'user account or email',   //嘀咕账号
    PASSWORD:'password here',     //嘀咕密码
    USER_TO_SAVE:'qnqysupi'//需要保存的用户账号，可以是自己，也可以是好友的
}

```

# Features
* Back up all your own messages through API
* Export as HTML file with Images(Original)




#TODO
* Send email function






