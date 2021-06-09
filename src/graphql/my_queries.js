export const listSchoolUsersNoPassword = /* GraphQL */ `
  query ListSchoolUsers(
    $filter: ModelSchoolUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchoolUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;