
#set up the node project and run

#open the register api and send parameters below to register
{
    "fullName":"knovator tech 2",
    "email":"knovator2@gmail.com",
    "password":"test123"
}

#go to login api and add the credentials below
{
     "email" :"knovator@gmail.com",
    "password": "test123"
}

#open the create post api -
send the jwt token in the headers - 
authorization - jwt token 
send below parameters to create post
{
   "title": "neew abc",
    "body" : "this is test body for post",
    "createdBy": "knovator",
    "isActive" : 1,
    "lat" : "52.152066",
"long" : "9.952231"
}

#to update post send the parameters to update and 
send post id in parameter

#to get the particular post open the get post by id api
and send post id in parameter

#to get particular post by latitude and longitude
open the get posts by lat long api and send below parameter
{
    "lat" : "52.152066",
"long" : "9.952231"
}

#to get total posts and active inactive posts -
call the - getPosts by active inactive api
