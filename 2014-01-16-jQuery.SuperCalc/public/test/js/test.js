/* TEST js */
/*
test( "name of test", function() {
      deepEqual( actual, expected, "my test message" );
});
*/

test("containsChar", function(){
  deepEqual(containsChar('mouse', 'u'), true, "Is u in mouse?");
  deepEqual(containsChar('mouse', 'z'), false, "Is z in mouse?");
});
