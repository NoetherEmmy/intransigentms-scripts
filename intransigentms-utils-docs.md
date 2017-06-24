# What's in intransigentms-utils.min.js/intransigentms-utils.js

```haskell
jsArray :: java.util.Collection<T> -> Array<T>
jsArray :: java.util.Map<K, V> -> Array<Array(K, V)>
jsArray :: T[] -> Array<T>
jsArray :: byte[] -> Array<Number>
jsArray :: short[] -> Array<Number>
jsArray :: int[] -> Array<Number>
jsArray :: long[] -> Array<Number>
jsArray :: float[] -> Array<Number>
jsArray :: double[] -> Array<Number>
jsArray :: char[] -> Array<java.lang.Character>
jsArray :: boolean[] -> Array<Boolean>
```

Takes in a `java.util.Collection`, a `java.util.Map`, or any native Java array, and converts it to a more or less native JavaScript representation, as an `Array`.

`java.util.Map`s are converted to an `Array` instead of an `Object` since the `java.util.Map` may have an ordering (`LinkedHashMap`, `TreeMap`). Any `java.util.Map`'s entries are converted to JavaScript 2-tuples (`Array`s of length 2).

```haskell
range :: Number -> Array<Number>
range :: Number, Number -> Array<Number>
range :: Number, Number, Number -> Array<Number>
```

`range(start, end, step)` is a function returning an `Array` of `Number`s that represents a "range" between `start` (inclusive) and `end` (exclusive). The range steps by increments of `step`. If `step` is omitted, it defaults to `1`. If, furthermore, `end` is omitted, `end` takes the value of `start`, and `start` takes the value of `0`.

If `step` is negative or `end` is less than `start` (or both), the resulting range is descending. Otherwise the range is ascending.

```haskell
chooseRandom :: Array<T> -> T
chooseRandom :: Object -> Array(String, T)
chooseRandom :: java.util.Collection<T> -> T
chooseRandom :: java.util.Map<K, V> -> Array(K, V)
chooseRandom :: T[] -> T
chooseRandom :: byte[] -> Number
chooseRandom :: short[] -> Number
chooseRandom :: int[] -> Number
chooseRandom :: long[] -> Number
chooseRandom :: float[] -> Number
chooseRandom :: double[] -> Number
chooseRandom :: char[] -> java.lang.Character
chooseRandom :: boolean[] -> Boolean
```

Chooses a random element of the provided argument, and returns that element. Like in `jsArray`, `java.util.Map`s are treated as a collection of entries, and when an entry is chosen, it is returned as a JavaScript 2-tuple (`Array` of length 2). Same goes for `Object`s.

```haskell
Array.prototype.fisherYates :: () -> Array<T>
```

Shuffles the array *in place* using the Fisher-Yates algorithm, and then returns a reference to the array itself.
