const R = require('ramda')

const { Success, Failure } = require('../src/control/Validation')

const lift2 = f => x => y => x.map(f).ap(y)

const result = [
  Success(3).map(R.inc),
  Failure(["fobar"]).map(R.inc),
  Success(R.inc).ap(Success(3)),
  Success(R.inc).ap(Failure(["invalid something"])),
  Failure("foobar").ap(Success(3)),
  Failure(["invalid something1"]).ap(Failure(["invalid something2"])),
  Failure(["something went wrong"])
]
