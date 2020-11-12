## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

# Cypher

```cypher
MATCH(p1:Person)-[r1:Knows]->(p2:Person)-[r2:PersonIsLocatedIn]-> (ct1:City), (p1:Person)-[:WorkAt]->(cp1:Company)-[:OrganisationIsLocatedIn]-> (co:Country), (p1:Person)-[:StudyAt]->(u1:University)-[:OrganisationIsLocatedIn]-> (ct2:City) RETURN *
```

```cypher
MATCH(p1:Person)-[:Knows]->(p2:Person) RETURN *;
```

```cypher
MATCH (p1:Person)-[:Knows]->(p2:Person)<-[:CommentHasCreator]-(c1:Comment)<- [:ReplyOfComment]-(c2:Comment)-[:CommentHasCreator]->(p1) RETURN *;
```

```cypher
MATCH (p1:Person)-[:Knows]->(p2:Person)-[:LikesPost]->(m:Post)- [:PostHasCreator]->(p1:Person) RETURN *;
```

```cypher
MATCH (p1:Person)<-[:PostHasCreator]-(m:Post)<-[:ReplyOfPost]-(c:Comment)- [:CommentHasCreator]->(p2:Person) RETURN *;
```

```cypher
MATCH (p1:Person)-[:Knows]->(p2:Person)-[:LikesPost]->(m:Post)- [:PostHasCreator]->(p1:Person) RETURN *;
```

```cypher
MATCH (p1:Person)<-[:PostHasCreator]-(m:Post)<-[:ReplyOfPost]-(c:Comment)- [:CommentHasCreator]->(p2:Person) RETURN *;
```

```cypher
MATCH(p1:Person)-[:Knows]->(p2:Person)<-[:PostHasCreator]-(m:Post) 2 RETURN *;
```

```cypher
MATCH (p1:Person)-[:Knows]->(p2:Person)-[w:WorkAt]->(o:Company)- [:OrganisationIsLocatedIn]->(c:Country) RETURN *;
```
