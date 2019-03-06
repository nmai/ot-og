# lucid-core-rx
collaborative data management

### Usage
`npm test` will run all tests and watch for changes

The API will be documented here when it's ready. There is no example app yet.

### Description
The objective is to make it easier to create a collaborative app- we will focus on text-based documents for now. Flexibility and approachability is important to me- I'm not sure if anyone will be using this library, but regardless it should remain relatively unbiased and have a simple API.

Redux is being used to manage state. Not sure how to handle persistent/semi-persistent data, or even whether this library should handle that aspect at all. Will look at couchdb/pouchdb.

### todo

### brainstorm
name.. unspool
any data set modified over time can be represented with the log

application.. Don't Sink

### dev log updates...
12:40pm Jan 19 2019- 

Returning to the project after a long time away... rethinking the architecture a bit... I like the tests and the solid base I built, but I don't like all the "hacks" I was using to build a typing system that would be usable at runtime. Feels like doubling the complexity for no gain, other than to assuage my OCD. Yet the solution still feels messy.

So. Tearing out the extra stuff. Going to keep it simple. Forget about all the interfaces and factories and enums and constants. I'm going to have two main op types, and the runtime type system will simply be string INSERT or DELETE. Keep it simple! Later I can replace it easily with enums or whatever, build factories and network adapters and whatnot.. but that's all optimization and my mistake has always been to give it precedence over substance.

1:30pm Feb 02 2019-

Reflecting on the last time I attempted to work on this, I recall I gave up pretty quickly because I was stumped by the problem of applying reverse transformations. Today I read the wikipedia on OT and I see there is actually a multitude of OT algorithms, meaning there's a bunch of different ways to solve this problem, but what stood out to me was the diagram at the top.

All this time I have been trying to force a centralized model by treating the server as the single source of truth. I think some of the algos utilize this concept but most seem not to be centralized. And it makes sense, because the centralized model actually increases implementation complexity.

Rather, going forward I'm going to treat all participants the same (server and clients). Only difference is server will also be responsible for propagation and passing on snapshots to new clients. I'll use timestamps on every operation.
