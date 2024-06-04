import { gql } from '@apollo/client';

export const GET_STRATEGIES = gql`
query GetStrategies {
  strategies {
    data {
            id
      attributes {
                name
                short
                description
                type
        patterns {
          data {
               id
            attributes {
                            name
                            description
                            contex
                        }
                    }
                }
            }
        }
    }
}`;