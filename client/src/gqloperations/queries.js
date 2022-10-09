import { gql } from '@apollo/client'
export const GET_USER_BY_ID = gql`
query getUserById {
  user:mybooks{
    savedBooks{
      _id
      authors
      bookId
      title
      image
      description
    }
  }
}
`

