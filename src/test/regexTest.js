
function testRegexTrue(testPattern, target) {
  const regexPattern = new RegExp(testPattern);
  // Test
  let match = target.match(regexPattern);
  console.assert(match !== null, `${target} は正規表現にマッチするはずが、マッチしませんでした。`);

  // Output
  if (match !== null) {
    console.log("- [x] " + target + " matched.");
  } else {
    console.log("- [ ] " + target + " should be matched.");
  }
}

function testRegexFalse(testPattern, target) {
  const regexPattern = new RegExp(testPattern);
  // Test
  let match = target.match(regexPattern);
  console.assert(match === null, `${target} は正規表現にマッチしないはずが、マッチしました。`);

  // Output
  if (match === null) {
    console.log("- [x] " + target + " not matched.");
  } else {
    console.log("- [ ] " + target + " should be not matched.");
  }
}

let testPattern = '';

// Test aura route
testPattern = "(route|get|delete|head|options|patch|post|put)\\(['\"]([^'\"]*?)['\"]";
// $map->get('/category', '/category/path/accessed/by/user') => jump to src/Resource/Page/Category.php
testRegexTrue(testPattern, "$map->get('/category', '/category/path/accessed/by/user')");
testRegexFalse(testPattern, "$map->foo('/category', '/category/path/accessed/by/user')");
// $map->route('/subCategory', '/sub-category/path/accessed/by/user') => jump to src/Resource/Page/SubCategory.php
testRegexTrue(testPattern, "$map->route('/subCategory', '/sub-category/path/accessed/by/user')");
testRegexFalse(testPattern, "$map->foo('/subCategory', '/sub-category/path/accessed/by/user')");
// $map->post('/topics/index', '/topics/path/accessed/by/user') => jump to src/Resource/Page/Topics/Index.php
testRegexTrue(testPattern, "$map->post('/topics/index', '/topics/path/accessed/by/user')");
testRegexFalse(testPattern, "$map->foo('/topics/index', '/topics/path/accessed/by/user')");
// $map->get('/foo-bar', '/category/path/accessed/by/user') => jump to src/Resource/Page/FooBar.php
testRegexTrue(testPattern, "$map->get('/foo-bar', '/category/path/accessed/by/user')");
testRegexFalse(testPattern, "$map->foo('/foo-bar', '/category/path/accessed/by/user')");
