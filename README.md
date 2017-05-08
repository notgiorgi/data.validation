## Validation library for Algebraic Data Types

### API

```haskell
data Validation a b = Failure a
                    | Success b
```

Validation type implements Functor, Applicative and Monad typeclasses in [fantasy-land]() spec

```haskell
instance Functor (Validation a)
instance Monoid a => Applicative (Validation a)
instance Monad (Validation a)
```

example:

```js
const Person = R.curry(
    daggy.tagged('Person', ['name', 'age'])
)

const checkName = name => name.length > 2 ? Just(name) : Nothing
const checkAge = age => age > 13 ? Just(age) : Nothing

const lift2 = ctor => x => y => x.map(ctor).ap(y)

const mkPerson = (name, age) => lift2(Person)(name)(age)
```
