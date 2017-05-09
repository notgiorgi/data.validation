## Validation library for Algebraic Data Types

```haskell
data Validation a b = Failure a
                    | Success b
```

### API
Validation type implements Functor, Applicative and Monad typeclasses in [fantasy-land](https://github.com/fantasyland/fantasy-land) spec

```haskell
instance Functor (Validation a)
instance Monoid a => Applicative (Validation a)
instance Monad (Validation a)
```

additional methods:

```haskell
fold :: Validation a b ~> (a -> c) -> (b -> c) -> c

isSuccess :: Validation t a ~> bool

fail :: t -> Validation t a
```

example:

```js
const Person = R.curry(
  daggy.tagged('Person', ['name', 'age'])
)

const checkName = name =>
  name.length > 2
  ? Success(name)
  : Failure(["name should be more then 2 characters long"])

const checkAge = age =>
  age >= 13
  ? Success(age)
  : Failure(["you should be at least 13 years old"])

const lift2 = ctor => x => y => x.map(ctor).ap(y)

const mkPerson = (name, age) => lift2(Person)(name)(age)

mkPerson(
  checkName("George Martin"),
  checkAge(68)
).toString() // Validation.Success(Person("George Martin", 68))

mkPerson(
  checkName("f"),
  checkAge(11),
).toString() // Validation.Failure(["name should be more then 2 characters long", 
             //                     "you should be at least 13 years old"])
```
