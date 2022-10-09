const { gql } = require("apollo-server");

const typeDefs = gql`
 type Query{
    mybooks:User
 }

 type User{
     _id:ID!
     username:String!
     email:String!
     password:String!
     savedBooks:[Book]
 }

 type Book{
    _id:ID!
    description:String!
    authors:[String!]
    bookId:String!
    image:String!
    title:String!
 }


 type Token{
     token:String!
 }

 type Mutation{
     signupUser(userNew:UserInput!):Token
     signinUser(userSignin:UserSigninInput!):Token
     saveBook(bookNew:BookInput!):String
     deleteBook(bookId:String!):String
 }

 input BookInput{
    description:String!
    authors:[String!]
    bookId:String!
    image:String!
    title:String!
 }

 input UserInput{
    username:String!
    email:String!
    password:String!
 }
 input UserSigninInput{
    email:String!
    password:String!
 }

`
module.exports = typeDefs;