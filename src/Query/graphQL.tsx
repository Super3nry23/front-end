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

export const GET_STRATEGIES_EXTENDED = gql`query GetStrategies {
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
                            weaknesses {
                              data {
                                id
                                attributes {
                                  code
                                  name
                                }
                              }
                            }
                            owasps {
                              data {
                                id
                                attributes {
                                  code
                                  name       
                                }
                              }
                            }
                            principles {
                              data {
                                id
                                attributes {
                                  name
                                }
                              }
                            }
                            isos {
                              data {
                                id
                                attributes {
                                  code
                                  name
                                }
                              }
                            }
                            gdprs {
                              data {
                                id
                                attributes {
                                  code
                                  name
                                }
                              }
                            }
                            contex
                            MCV_Collocation {
                              id
                              name
                            }
                        }
                    }
                }
            }
        }
    }
}`;

export const GET_STRATEGIES_BY_PATTERN_TYPE = gql`
query GetStrategies($patternId: ID, $type: String) {
  strategies(filters: { patterns: { id: { eq: $patternId } }, type: { eqi: $type } }) {
    data {
            id
      attributes {
                name
                short
                description
                type
        patterns(filters: { id: { eq: $patternId } }) {
          data {
               id
            attributes {
                            name
                            contex
              							description
              weaknesses {
                data {
                  id
                  attributes {
                    code
                    name
                  }
                }
              }
                        }
                    }
                }
            }
        }
    }
}`;