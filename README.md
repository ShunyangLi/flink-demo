![](./fig/1.png)

# Result data format
[result format](https://drive.google.com/file/d/1PSfjAgjhh6NhDvstO_L4YWjaEBOnVyWG/view)

# Cypher Queries

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
