const { taggedSum } = require('daggy')
const { of, map, ap } = require('fantasy-land')

const Validation = taggedSum('Validation', {
  Failure: ['errors'],
  Success: ['x'],
})

const { Success, Failure } = Validation

Validation.prototype.fold = function (f, g) {
  return this.cata({
    Success: value => g(value),
    Failure: x => f(x)
  })
}

Validation.prototype.map = Validation.prototype[map] = function (f) {
  return this.cata({
    Success: value => Success(f(value)),
    Failure: errors => Failure(errors)
  })
}

Validation.of = Validation[of] = x => Success(x)
Validation.fail = err => Failure(err)

Validation.prototype.ap = Validation.prototype[ap] = function (f) {
  return this.cata({
    Success: fn =>
      f.cata({
        Success: x => Success(fn(x)),
        Failure: () => f
      }),
    Failure: errors =>
      f.cata({
        Success: () => this,
        Failure: otherErrors => Failure(errors.concat(otherErrors))
      })
  })
}

Validation.prototype.isSuccess = function () {
  return this.cata({
    Success: () => true,
    Failure: () => false,
  })
}

module.exports = {
  Validation,
  Success,
  Failure,
}
