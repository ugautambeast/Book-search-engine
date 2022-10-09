import { gql } from '@apollo/client'
export const ADD_USER = gql`
    mutation createUser($userNew:UserInput!){
        user:signupUser(userNew:$userNew){ 
          token
        }
    }
`
export const LOGIN_USER = gql`
mutation SigninUser($userSignin:UserSigninInput!){
    user:signinUser(userSignin:$userSignin){ 
      token
    }
  }
`

export const SAVE_BOOK = gql`
  mutation SaveBook($bookNew:BookInput!){
    book:saveBook(bookNew:$bookNew)
  }
`

export const REMOVE_BOOK = gql`
  mutation DeleteBook($bookId:String!){
    book:deleteBook(bookId:$bookId)
  }
`