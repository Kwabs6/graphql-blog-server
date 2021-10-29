const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((res) => res.data);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",

  fields: () => ({
    deleteUser: {
      type: UserType,
      args: { id: { type: new graphql.GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:3000/users/${args.id}`)
          .then((res) => res.data);
      },
    },

    // // updateUser: {
    // //   type: UserType,
    // //   args: {
    // //     id: { type: new graphql.GraphQLNonNull(GraphQLString) },
    // //     userName: { type: GraphQLString },
    // //     age: { type: { GraphQLString } },
    // //     email: { type: { GraphQLString } },
    // //   },
    // //   resolve(parentValue, { id, userName, age, email }) {
    // //     return axios.patch(`http://localhost:3000/users/${args.id}`, {
    // //       id,
    // //       userName,
    // //       age,
    // //       email,
    // //     });
    // //   },
    // },

    // // addUser: {
    // //   type: UserType,
    // //   args: {
    // //     id: { type: new graphql.GraphQLNonNull(GraphQLString) },
    // //     userName: { type: GraphQLString },
    // //     age: { type: { GraphQLString } },
    // //     email: { type: { GraphQLString } },
    // //   },
    // //   resolve(parentValue, { id, userName, age, email }) {
    // //     return axios.post(`http://localhost:3000/users/${args.id}`, {
    // //       id,
    // //       userName,
    // //       age,
    // //       email,
    // //     });
    // //   },
    // },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
