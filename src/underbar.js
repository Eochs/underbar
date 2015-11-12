(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n > array.length)
      return array;
    return n === undefined ? array[array.length-1] : array.slice(array.length - n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }

    } else { // assume collection is object
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }

    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var pass_array = [];

    _.each(collection, function(item) {
      if ( test(item) ) {
        pass_array.push(item);
      }
    });
    return pass_array;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it   
    return _.filter(collection, function(item) { return !test(item); })
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var unique_elements = [];
    var elements_set = {};

    _.each(array, function(item) {
      if (item in elements_set) {
        ; // do nothing
      } else {
        unique_elements.push(item);
        elements_set[item] = true;
      }
    });
    return unique_elements;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var transformed_array = [];

    _.each(collection, function(item) {
      transformed_array.push( iterator(item) );
    });
    return transformed_array;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var array_of_values = _.map(collection, _.identity);

    if (accumulator === undefined) {
      accumulator = array_of_values[0];
      array_of_values = _.last(array_of_values, array_of_values.length - 1);
    }

    _.each(array_of_values, function(item){
      accumulator = iterator(accumulator, item);
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator === undefined) 
      iterator = _.identity;

    return _.reduce(collection, function(allTrue, item) {
      return allTrue && Boolean(iterator(item));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator === undefined ? _.identity : iterator;

    return !(_.every(collection, function(item) {
      return !iterator(item);
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var n = arguments.length;
    if (n === 1)
      return obj;

    for (var i = 1; i < n; i++) {
      var obj_i = arguments[i];
      _.each(obj_i, function(item, key) {
        obj[key] = item;
      });
    }

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var n = arguments.length;
    if (n === 1)
      return obj;

    for (var i = 1; i < n; i++) {
      var obj_i = arguments[i];
      _.each(obj_i, function(item, key) {
        if (obj[key] === undefined){
          obj[key] = item;
        } 
      });
    }

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var mem = {};
    var result;

    return function() {
      var args = String( Array.prototype.slice.call(arguments) );
      if (args in mem) {
        return mem[args];
      } 

      result = func.apply(this, arguments);
      mem[args] = result;

      return result;
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    return setTimeout.apply(null, arguments);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var to_shuffle = Array.prototype.slice.call(array);
    var num_shuffles = to_shuffle.length;
    var shuffled = [];
    // using random numbers, get index of one of the remaining elements to shuffle
    // remove that element from to_shuffle, and add it to shuffled
    function getRandomIndex(length) { // non-inclusive
      return Math.floor( Math.random() * (length-1) );
    }

    // to start, get elem that is not first in original array
    var first_index = Math.floor(Math.random() * (to_shuffle.length - 1)) + 1;
    var first_elem = to_shuffle.splice(first_index, 1)[0]; // remove elem at first index
    shuffled.push(first_elem);

    // go through n-1 more shuffles to get the rest of the elements from the original array
    for (var ith = 1; ith < num_shuffles; ith++) { 
      var random_index = getRandomIndex( to_shuffle.length ); // to_shuffle array is shrinking
      var elem = to_shuffle.splice(random_index, 1)[0]; // remove 1 element at random index
      shuffled.push(elem);
    }

    return shuffled;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    
    return _.map(collection, function(item) {
      // test whether it is a function, or a key to get a function
      var func = (typeof functionOrKey === 'function') ? functionOrKey : item[functionOrKey];
      //if (func == null) { return null; } 
      // call the function | method on args using the item as the context
      if (typeof func === 'function') { return func.apply(item, args); }
      else { return func; }
    });
      
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var values;
    if (typeof iterator === 'string')
      values = _.invoke(collection, iterator);
    else 
      values = _.map(collection, iterator);
    var tuples = _.zip(collection, values);
    console.log(values, tuples);
    var sorted_tuples = tuples.sort(function(a,b) {
      if (a[1] === undefined && b[1] === undefined) return 0;
      if (a[1] === undefined) return 1; // puts undefined to last
      if (b[1] === undefined) return -1;
      return a[1] - b[1];
    });
    return _.pluck(sorted_tuples, 0);
    
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    if (arguments.length <= 1) 
      return arguments;

    var zipped = [];

    for (var i = 0; i < arguments[0].length; i++) {
      zipped.push( [] );

      for (var arr = 0; arr < arguments.length; arr++) {
        zipped[i].push( arguments[arr][i] );
      }
    }

    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, startIndex, result) {
    var flattened = [];
    startIndex = startIndex ? startIndex : 0;
    for (var i = startIndex; i < nestedArray.length; i++){
    //_.each(nestedArray, function(item){
      if (Array.isArray(nestedArray[i])) {
        flattened = flattened.concat( _.flatten(nestedArray[i]) );
      } else {
        flattened.push(nestedArray[i]);
      }
    }//);

    return flattened;

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var n = arguments.length;
    var elems = {};
    var items_shared_by_all = [];

    _.each(arguments, function(ith_array) {
      _.reduce(ith_array, function(acc, elem) {
        acc[elem] = (elem in acc)? acc[elem] + 1 : 1;
        return acc;
      }, elems);
    });

    _.each(elems, function(value, key) {
      if (value === n) { // each array had this key
        items_shared_by_all.push( key );
      }
    });

    return items_shared_by_all;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(arguments, 1); //flatten all arguments after first array
    var elems_left = _.filter(array, function(value){
      //console.log("is value in rest of arguments?" + !_contains(rest, value));
      var test = (_.indexOf(rest, value) > -1);
      return !_.contains(rest, value);
    });
    return elems_left;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2); // get arguments following func & wait
    var last_called = new Date().getTime();
    var cached_result = func.apply(null, args);

    // throttledFunc checks that the last called 
    var throttledFunc = function() {
      var curr_time = new Date().getTime();

      if (curr_time > last_called + wait) {
        last_called = curr_time;
        cached_result = func.apply(null, args);
      } else {
        // if func called during 'wait' period, just give back previous value without recomputing
        return cached_result;
      }

    };

    return throttledFunc;
  };




}());
