import Syntaxe from '../../../src/index.js';
import appUsersLite from '../../../data/app-users-lite.js';

/*
- Return just id, status, package and langs for each object in the array
- Rename id as userId
- Rename package as subscriptionId
- Rename langs as languages
*/

const sx = new Syntaxe({
    data: appUsersLite,
    schema: `{
        id [as:"userId"]
        status
        package [as:"subscriptionId"]
        langs [as:"languages"]
    }`
});

await sx.query();

/*
Result:
[
  {
    userId: 1,
    status: 'active',
    subscriptionId: 'free',
    languages: [ 'English' ]
  },
  {
    userId: 2,
    status: 'under review',
    subscriptionId: 'free',
    languages: [ 'Japanese' ]
  },
  {
    userId: 3,
    status: 'under review',
    subscriptionId: 'premium',
    languages: [ 'English' ]
  },
  {
    userId: 4,
    status: 'active',
    subscriptionId: 'pro',
    languages: [ 'Korean' ]
  },
  {
    userId: 5,
    status: 'inactive',
    subscriptionId: 'free',
    languages: [ 'Korean' ]
  }
]
*/