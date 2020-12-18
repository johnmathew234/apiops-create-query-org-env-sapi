'use strict';


/**
 *
 * returns Object
 **/
exports.anypointEnvGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : "4db24a92-eed0-499d-a44c-402e2208620a",
  "name" : "Design",
  "organizationId" : "734f2b9e-090c-42ee-a81d-80b6e0995b04",
  "isProduction" : false,
  "type" : "design",
  "clientId" : "bdec9c75e90d44cb9116f64196e856bd"
}, {
  "id" : "9a5ac489-0c9b-452b-9ade-af2c8eb2538e",
  "name" : "Production",
  "organizationId" : "734f2b9e-090c-42ee-a81d-80b6e0995b04",
  "isProduction" : true,
  "type" : "production",
  "clientId" : "dd7421e9bf1740fcb97c5a91672b8d93"
}, {
  "id" : "d1235e46-3714-4b3c-a18d-6c86bcd5b6ca",
  "name" : "Sandbox",
  "organizationId" : "734f2b9e-090c-42ee-a81d-80b6e0995b04",
  "isProduction" : false,
  "type" : "sandbox",
  "clientId" : "60089cf90e034f77a66d0308f8127dcb"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * generated Create-env-DT  (optional)
 * returns Object
 **/
exports.anypointEnvPOST = function(generated) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Environment Created"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * returns Object
 **/
exports.anypointOrgGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "Organization Name" : "NJC Labs",
  "id" : "8d0888ce-0877-4524-8983-063be18c34be"
}, {
  "Organization Name" : "core services sub",
  "id" : "aaeefd35-3f99-4193-9495-56dd2560dec4"
}, {
  "Organization Name" : "core services sub1",
  "id" : "c03fd737-9dff-46da-baa3-6a9cdb830010"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * generated Create-org-DT  (optional)
 * returns Object
 **/
exports.anypointOrgPOST = function(generated) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "organization created"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

