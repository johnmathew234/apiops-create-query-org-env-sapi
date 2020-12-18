
const request = require('request')
const config = require('config')



function generateToken(cb){
    request.post(
        config.get('anypoint.host1'),
        {
          json: {
          "username" : config.get('anypoint.username'),
          "password" : config.get('anypoint.password')
      },
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          console.log(`statusCode: ${res.statusCode}`)
          //console.log(body)     // token hidden from console
          console.log("TOKEN GENERATED FOR AUTHENTICATION")
          console.log("----------------------------------------------")
          cb(body)
        }
      )
}


function getOrgId(token,cb)
{

        request.get({
            "headers": { "content-type": "application/json","Authorization": `Bearer ${token}` },
            "url": config.get('anypoint.host2') +  config.get('anypoint.path2')

        },
        (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            //console.log("LIST OF ENVs")
            console.log("----------------------------------------------")
            //console.log(body)
            const resBody = JSON.parse(body)
            var orgId = resBody.user.organization.id
            cb(orgId)
            /*
            if(cb)
            {
                
            cb(body,res.statusCode)
            //console.log(res)
            }
            */
            })

}

function getEnv(cb){


    generateToken((body)=>{
      const token = body.access_token
      getOrgId(token,(orgId)=>{
        //console.log(orgId)

        request.get({
          "headers": { "content-type": "application/json","Authorization": `Bearer ${token}` },
          "url": config.get('anypoint.host') + orgId  + config.get('anypoint.path')

        },
        (error, res, body) => {
            if (error) {
              console.error(error)
              return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log("LIST OF ENVs")
            console.log("----------------------------------------------")
            var listOfEnvs = JSON.parse(body)
            console.log(listOfEnvs.data)
            if(cb)
            {
              
            cb(body,res.statusCode)
            //console.log(res)
            }
          }

        )


    })










    })
}



function postEnv(generated,cb){


  generateToken((body)=>{

    const token = body.access_token


    getOrgId(token,(orgId)=>{
      //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
      //console.log(orgId)

      request.post({
        "headers": { "content-type": "application/json","Authorization": `Bearer ${token}` },
        "url": config.get('anypoint.host') + orgId  + config.get('anypoint.path'),
        "body": JSON.stringify(generated)

      },
      (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          console.log(`statusCode: ${res.statusCode}`)
          console.log("ENVIRONMENT CREATED")
          console.log("----------------------------------------------")
          var postOrgRes = JSON.parse(body)
          console.log(postOrgRes)
          if(cb)
          {
            
          cb(body,res.statusCode)
          //console.log(res)
          }
        }

      )


  })





      
    })
  }


  function postOrg(generated,cb){

    var orgName = generated.name

    //console.log(orgName)


    generateToken((body)=>{
        const token = body.access_token
        request.get({
          "headers": { "content-type": "application/json","Authorization": `Bearer ${token}` },
          "url": config.get('anypoint.host2') + config.get('anypoint.path2')
      },
          (error, res, body) => {
            if (error) {
              console.error(error)
              return
            }
            console.log(`statusCode: ${res.statusCode}`)
            //console.log(body)
            var obj = JSON.parse(body)
            var ownerId = obj.user.id
            console.log(typeof obj.user.id)
            console.log("----------------------------------------------")
            console.log("ORG CREATED")
            getOrgId(token,(orgId)=>{
                //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                //console.log(orgId)

                request.post({
                    "headers": { "content-type": "application/json","Authorization": `Bearer ${token}` },
                    "url": config.get('anypoint.host'),
                    "json": {
                        "name": orgName,
                        "ownerId" : ownerId,
                        "parentOrganizationId" : orgId
                    }
                    },
                    (error, res, body) => {
                      if (error) {
                        console.error(error)
                        return
                      }
                      console.log(`statusCode: ${res.statusCode}`)
                      if(res.statusCode == 201){
                      console.log(body)
                      console.log()
                      console.log("ORGANISATION CREATED")
                      }
                      else{
                        console.log(body)
                      } 
                      if(cb)
                      cb(body,res.statusCode)
            
                })


            })
            
  
          })
      })
    }

    function getOrg(cb){


      generateToken((body)=>{
          request.get({
            "headers": { "content-type": "application/json","Authorization": `Bearer ${body.access_token}` },
            "url": "https://anypoint.mulesoft.com" +  config.get('anypoint.path2')
  
          },
          (error, res, body) => {
              if (error) {
                console.error(error)
                return
              }
              console.log(`statusCode: ${res.statusCode}`)
              console.log("LIST OF ORGs")
              console.log("----------------------------------------------")
              //console.log(JSON.parse(body))
              var getOrgRes = JSON.parse(body)
              var getOrgRes1 = getOrgRes.user.contributorOfOrganizations 
              
              const getOrgRes2 = getOrgRes1.map(item => {
                const container = {};
                container.id = item.id;
                container.name = item.name;
                container.parentOrg = item.isMaster
                return container;
            })
            console.log(getOrgRes2);

              //console.log(getOrgRes.user.contributorOfOrganizations)
              if(cb)
              {
                
              cb(body,res.statusCode)
              //console.log(res)
              }
            }
  
          )
      })
  }
    

module.exports={getEnv, postEnv, postOrg, getOrg}