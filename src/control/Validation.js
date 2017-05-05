const { taggedSum } = require('daggy')
const fl = require('fantasy-land')

const Validation = taggedSum('Validation', {
  Failure: ['errors'],
  Success: ['x'],
})

const { Success, Failure } = Validation

Validation.prototype.fold = function (f) {
  return this.cata({
    Success: value => f(value),
    Failure: x => x
  })
}

Validation.prototype[fl.map] = function (f) {
  return this.cata({
    Success: value => Success(f(value)),
    Failure: errors => Failure(errors)
  })
}

Validation[fl.of] = x => Success(x)
Validation.fail = err => Failure(err)

Validation.prototype[fl.ap] = function (f) {
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

Validation.prototype[fl.chain] = function (f) {
  return this.cata({
    Success: value => f(value),
    Failure: () => this
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
